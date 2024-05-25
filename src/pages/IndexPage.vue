<template>
  <q-page class="bg-grey-2">
    <div class="row no-wrap justify-between items-center q-px-lg">
      <div class="text-center q-py-md text-subtitle2">
        {{ formattedDate() }}
      </div>
      <div>
        <q-btn-dropdown
          flat
          dropdown-icon="settings"
          size="sm"
          color="grey-7"
          auto-close
          :menu-offset="[0, 16]"
        >
          <q-list>
            <q-item>
              <q-item-section>
                <q-btn
                  unelevated
                  square
                  color="blue-6"
                  label="Target Calories"
                  icon-right="edit"
                  no-caps
                  @click="editTargetCalories()"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-btn
                  unelevated
                  square
                  label="flush"
                  color="red-6"
                  icon-right="delete"
                  @click="flush()"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>

    <SummaryBanner />

    <FoodTable />

    <q-btn color="primary" label="Get fire foods" @click="handleClick()" />
    {{ fireFoods ? fireFoods : "nothing yet" }}

    <q-btn label="Fireweight" @click="getFireweight()" />
    {{ fireweight ? fireweight : "No weight" }}

    <div style="height: 150px"></div>

    <div class="fixed-bottom-right q-mb-md q-mr-md column q-gutter-y-md">
      <q-btn
        round
        :color="bodyWeight > 0 ? 'orange' : 'red'"
        icon="scale"
        @click="editBodyWeight()"
      />
      <q-btn round color="blue-6" icon="content_copy" @click="copy()" />
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, computed } from "vue";
import EditFoodDialog from "components/EditFoodDialog.vue";
import { formattedDate } from "src/services/helpers.js";
import prefs from "src/services/preferences.js";
import { getFireFoods, getBodyWeight } from "src/services/firestore.js";
import SummaryBanner from "src/components/SummaryBanner.vue";
import FoodTable from "src/components/FoodTable.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    SummaryBanner,
    FoodTable,
  },
  setup() {
    const $q = useQuasar();

    // *** SIMPLE STATES ***

    const showInputRow = ref(false);

    // *** TARGET CALORIES ***

    const targetCalories = ref(0);

    const getTargetCalories = async () => {
      return await prefs.getTargetCalories();
    };

    getTargetCalories().then((data) => {
      targetCalories.value = data;
    });

    function editTargetCalories() {
      $q.dialog({
        title: "Edit Target Calories",
        message: "What is your new daily Calorie target?",
        prompt: {
          model: targetCalories.value,
          type: "number",
        },
        cancel: true,
      }).onOk((input) => {
        prefs.setTargetCalories(input).then(() => {
          targetCalories.value = input;
        });
      });
    }

    // *** BODY WEIGHT ***

    const bodyWeight = ref(0);

    const getBodyWeight = async () => {
      return await prefs.getBodyWeight();
    };

    getBodyWeight().then((data) => (bodyWeight.value = data));

    function editBodyWeight() {
      $q.dialog({
        title: "Edit Body Weight",
        message: "What is your current body weight?",
        prompt: {
          model: bodyWeight.value,
          type: "number",
        },
        cancel: true,
      }).onOk((input) => {
        bodyWeight.value = input
        prefs.setBodyWeight(input)
      });
    }

    // *** FOODS ***

    const foods = ref([]);

    const getFoods = async () => {
      return await prefs.getFoods();
    };

    getFoods().then((data) => (foods.value = data));

    function addFood() {
      if (newFood.value.name !== "" && newFood.value.calories > 0) {
        const entry = {
          id: uuidv4(),
          name: newFood.value.name,
          calories: Number(newFood.value.calories),
        };
        prefs.addFood(entry);
        foods.value.push(entry);
        showInputRow.value = false;
        newFood.value = {
          name: "",
          calories: 0,
        };
      }
    }

    const newFood = ref({
      name: "",
      calories: 0,
    });

    function editFood(id) {
      const food = foods.value.find((f) => f.id === id);
      $q.dialog({
        component: EditFoodDialog,
        componentProps: {
          food: food,
        },
      }).onOk((data) => {
        if (data.name !== "" && data.calories > 0) {
          const indexToReplace = foods.value.findIndex(
            (food) => food.id === data.id
          );
          if (indexToReplace !== -1) {
            foods.value[indexToReplace] = { ...data };
            prefs.setFoods(foods.value);
          }
        }
      });
    }

    function deleteFood(id) {
      $q.dialog({
        title: "Are you sure?",
        message: "This will delete the food.",
        cancel: {
          flat: true,
          color: "blue-5",
          noCaps: true,
        },
        ok: {
          color: "red",
          unelevated: true,
          label: "delete",
        },
      }).onOk(() => {
        const indexToDelete = foods.value.findIndex((food) => food.id === id);
        if (indexToDelete !== -1) {
          foods.value.splice(indexToDelete, 1);
          prefs.setFoods(foods.value);
        }
        $q.notify({
          message: "Food deleted",
          color: "red",
          textColor: "white",
        });
      });
    }

    const totalCalories = computed(() => {
      let total = 0;
      foods.value.forEach((food) => {
        total += Number(food.calories);
      });
      return total;
    });

    const progress = computed(() => (totalCalories.value / targetCalories.value) * 100);

    // *** FUNCTIONS ***

    function flush() {
      $q.dialog({
        title: "Are you sure?",
        message: "This will delete all data.",
        cancel: {
          flat: true,
          color: "blue-5",
          noCaps: true,
        },
        ok: {
          color: "red",
          label: "delete",
        },
      }).onOk(() => {
        foods.value = [];
        bodyWeight.value = 0;
        targetCalories.value = 0;
        prefs.clearAll();

        $q.notify({
          message: "All data flushed",
          color: "red",
          textColor: "white",
        });
      });
    }

    function copy() {
      const text = `${formattedDate()}\nBody Weight: ${
        bodyWeight.value
      } lbs\nTotal Calories: ${totalCalories.value}`;
      navigator.clipboard.writeText(text);
      $q.notify({
        message: "Copied info to clipboard:",
        caption: "Date, Body weight, Total Calories",
        color: "white",
        textColor: "primary",
        closeBtn: "close",
      });
    }

    return {
      foods,
      newFood,
      bodyWeight,
      targetCalories,
      totalCalories,
      progress,
      showInputRow,
      prefs,
      addFood,
      editFood,
      deleteFood,
      editBodyWeight,
      copy,
      flush,
      editTargetCalories,
      formattedDate,
    };
  },
});
</script>

<style scoped></style>

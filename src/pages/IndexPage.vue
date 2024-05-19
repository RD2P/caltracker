<template>
  <q-page class="bg-grey-2">
    <div class="row no-wrap justify-between items-center q-px-lg">
      <div class="text-center q-py-md text-subtitle2">{{ formattedDate }}</div>
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

    <!-- Top card -->
    <q-card
      flat
      style="font-size: 1rem"
      class="row items-center justify-evenly q-py-xl"
    >
      <div class="text-center">
        <span class="text-bold">{{ totalCalories }}</span> Calories<br />eaten
      </div>

      <div class="column">
        <q-circular-progress
          show-value
          size="120px"
          :value="progress"
          color="green"
          track-color="orange-4"
          class="text-center"
        >
          <span style="line-height: 0.8rem">
            <span style="font-size: 1.3rem" class="text-bold">{{
              targetCalories - totalCalories
            }}</span
            ><br />
            <span class="text-caption">to go</span>
          </span>
        </q-circular-progress>
        <div class="text-center q-mt-md">
          Target: <span class="text-bold">{{ targetCalories }}</span>
        </div>
      </div>

      <div class="text-center">
        Body weight<br /><span class="text-bold">{{ bodyWeight }} lbs</span>
      </div>
    </q-card>

    <!-- Table -->
    <q-markup-table class="q-px-lg q-mt-md bg-grey-1">
      <thead>
        <tr>
          <th style="font-size: 0.9rem" class="text-left">Food</th>
          <th style="font-size: 0.9rem" class="text-right">Calories</th>
          <th class="text-right">
            <q-btn
              flat
              color="green"
              :icon="showInputRow ? 'cancel' : 'add'"
              @click="showInputRow = !showInputRow"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="showInputRow">
          <td>
            <q-input dense v-model="newFood.name" />
          </td>
          <td>
            <q-input
              dense
              type="number"
              input-class="text-right"
              v-model="newFood.calories"
            />
          </td>
          <td><q-btn flat color="green" label="ok" @click="addFood()" /></td>
        </tr>
        <tr v-for="food in foods" :key="food.id">
          <td class="text-left">{{ food.name }}</td>
          <td class="text-right">{{ food.calories }}</td>
          <td class="text-right">
            <q-btn
              flat
              round
              color="blue"
              icon="edit"
              size="sm"
              @click="editFood(food.id)"
            />
            <q-btn
              flat
              round
              color="red-4"
              icon="delete"
              size="sm"
              class="q-ml-md"
              @click="deleteFood(food.id)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div style="height: 150px"></div>

    <div class="fixed-bottom-right q-mb-md q-mr-md column q-gutter-y-md">
      <q-btn
        round
        color="orange"
        icon="scale"
        @click="showBodyWeightDialog()"
      />
      <q-btn round color="blue-6" icon="content_copy" @click="copy()" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuasar } from "quasar";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import EditFoodDialog from "components/EditFoodDialog.vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const targetCalories = ref(2800);
    const bodyWeight = ref(121);
    const showInputRow = ref(false);

    const foods = ref([
      {
        id: "ec8d2f3e-bce9-40f2-978c-fdb3e2090e73",
        name: "Frozen Yogurt",
        calories: 500,
      },
      {
        id: "ec8d2f3e-bce9-40f2-978c-fdb3e2090e75",
        name: "Banana",
        calories: 200,
      },
      {
        id: "ec8d2f3e-bce9-40f2-978c-fdb3e2090e74",
        name: "Bread",
        calories: 300,
      },
      {
        id: "ec8d2f3e-bce9-40f2-978c-fdb3e2090e78",
        name: "Spag",
        calories: 100,
      },
    ]);

    const newFood = ref({
      name: "",
      calories: 0,
    });

    const totalCalories = computed(() => {
      let total = 0;
      foods.value.forEach((food) => {
        total += Number(food.calories);
      });
      return total;
    });

    const progress = (totalCalories.value / targetCalories.value) * 100;

    const formattedDate = computed(() => {
      const date = new Date();
      return format(date, "MMMM do, yyyy");
    });

    function addFood() {
      if (newFood.value.name !== "" && newFood.value.calories !== 0) {
        foods.value.push({
          id: uuidv4(),
          name: newFood.value.name,
          calories: Number(newFood.value.calories),
        });
        showInputRow.value = false;
        newFood.value = {
          name: "",
          calories: 0,
        };
      }
    }

    function editFood(id) {
      const food = foods.value.find((f) => f.id === id);
      $q.dialog({
        component: EditFoodDialog,
        componentProps: {
          food: food,
        },
      }).onOk((data) => {
        const indexToReplace = foods.value.findIndex(
          (food) => food.id === data.id
        );
        if (indexToReplace !== -1) {
          foods.value[indexToReplace] = { ...data };
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
        }
        $q.notify({
          message: "Food deleted",
          color: "red",
          textColor: "white",
        });
      });
    }

    function showBodyWeightDialog() {
      $q.dialog({
        title: "Body weight",
        message: "How much do you weigh today?",
        prompt: {
          model: bodyWeight.value,
          type: "number",
        },
        cancel: true,
      }).onOk((value) => {
        bodyWeight.value = value;
      });
    }

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

        $q.notify({
          message: "All data flushed",
          color: "red",
          textColor: "white",
        });
      });
    }

    function editTargetCalories() {
      $q.dialog({
        title: "Edit Target Calories",
        message: "What is your new daily Calorie target?",
        prompt: {
          model: targetCalories.value,
          type: "number",
        },
        cancel: true,
      }).onOk((value) => {
        targetCalories.value = value;
      });
    }

    function copy() {
      const text = `${formattedDate.value}\nBody Weight: ${bodyWeight.value} lbs\nTotal Calories: ${totalCalories.value}`;
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
      confirm: ref(false),
      formattedDate,
      showInputRow,
      addFood,
      editFood,
      deleteFood,
      showBodyWeightDialog,
      copy,
      flush,
      editTargetCalories,
    };
  },
});
</script>

<style scoped></style>

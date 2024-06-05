<template>
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
          <q-input dense autofocus placeholder="food" v-model="newFood.name" />
        </td>
        <td>
          <q-input
            dense
            type="number"
            input-class="text-right"
            placeholder="calories"
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
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { v4 as uuid } from "uuid";
import EditFoodDialog from "components/EditFoodDialog.vue";

export default defineComponent({
  name: "FoodTable",
  setup() {
    const $q = useQuasar();
    const showInputRow = ref(false);
    const foods = ref([]);

    const newFood = ref({
      name: "",
      calories: null,
    });

    function addFood() {
      if (newFood.value.name !== "" && newFood.value.calories > 0) {
        const entry = {
          id: uuid(),
          name: newFood.value.name,
          calories: Number(newFood.value.calories),
        };
        foods.value.push(entry);
        showInputRow.value = false;
        newFood.value = {
          name: "",
          calories: null,
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
        if (data.name !== "" && data.calories > 0) {
          const indexToReplace = foods.value.findIndex(
            (food) => food.id === data.id
          );
          if (indexToReplace !== -1) {
            foods.value[indexToReplace] = { ...data };
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
        }
        $q.notify({
          message: "Food deleted",
          color: "red",
          textColor: "white",
        });
      });
    }

    return {
      showInputRow,
      foods,
      newFood,
      addFood,
      editFood,
      deleteFood,
    };
  },
});
</script>

<style lang=""></style>

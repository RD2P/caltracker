<template>
  <q-page class="bg-grey-2">
    <!-- Top card -->
    <q-card
      flat
      style="font-size: 1rem"
      class="row items-center justify-between q-py-xl q-px-md"
    >
      <div class="text-center">
        <span class="text-bold">{{ totalCalories }}</span> Calories<br />eaten
      </div>

      <div>
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
      </div>

      <div class="text-center">
        Body weight<br /><span class="text-bold">{{ bodyWeight }} lbs</span>
      </div>
    </q-card>

    <q-markup-table class="q-px-lg q-my-md bg-grey-1">
      <thead>
        <tr>
          <th style="font-size: 0.9rem" class="text-left">Food</th>
          <th style="font-size: 0.9rem" class="text-right">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in foods" :key="food.name">
          <td class="text-left">{{ food.name }}</td>
          <td class="text-right">{{ food.calories }}</td>
        </tr>
      </tbody>
    </q-markup-table>

    <div
      class="fixed-bottom-right q-mb-md q-mr-md column items-center q-gutter-y-md"
    >
      <q-btn
        round
        color="orange"
        icon="scale"
        @click="showBodyWeightDialog()"
      />
      <q-btn
        round
        size="lg"
        icon="add_circle"
        color="green"
        @click="showAddFoodDialog()"
      />
    </div>
    <div
      class="fixed-bottom row justify-center q-mb-md"
    >
      <q-btn 
        round
        color="primary"
        outline
        icon="content_copy"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import { useQuasar } from "quasar";
import AddFoodDialog from "components/AddFoodDialog.vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const bodyWeight = ref(121);
    const targetCalories = 2800;
    const foods = reactive([
      {
        name: "Frozen Yogurt",
        calories: 500,
      },
      {
        name: "Banana",
        calories: 200,
      },
      {
        name: "Bread",
        calories: 300,
      },
      {
        name: "Spag",
        calories: 100,
      },
    ]);

    const totalCalories = computed(() => {
      let total = 0;
      foods.forEach((food) => {
        total += food.calories;
      });
      return total;
    });

    const progress = (totalCalories.value / targetCalories) * 100;

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

    function showAddFoodDialog() {
      $q.dialog({
        component: AddFoodDialog,
      });
    }



    return {
      foods,
      bodyWeight,
      targetCalories,
      totalCalories,
      progress,
      showBodyWeightDialog,
      showAddFoodDialog,
    };
  },
});
</script>

<style scoped></style>

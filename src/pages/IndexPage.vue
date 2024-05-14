<template>
  <q-page class="bg-grey-2">
    <div class="row justify-between">
      <q-btn label="Prev" icon="chevron_left" flat />
      <q-btn label="Next" icon-right="chevron_right" flat />
    </div>
    <q-card
      flat
      style="font-size: 1rem"
      class="row items-center justify-between q-my-lg q-pa-md"
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
            <span style="font-size: 1.3rem" class="text-bold">{{ targetCalories - totalCalories }}</span
            ><br />
            <span class="text-caption">to go</span>
          </span>
        </q-circular-progress>
      </div>

      <div class="text-center">
        Body weight<br /><span class="text-bold">120 lbs</span>
      </div>
    </q-card>

    <q-markup-table class="q-px-lg">
      <thead >
        <tr>
          <th style="font-size: 0.9rem;" class="text-left">Food</th>
          <th style="font-size: 0.9rem;" class="text-right">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in foods" :key="food.name">
          <td class="text-left">{{ food.name }}</td>
          <td class="text-right">{{ food.calories }}</td>
        </tr>
      </tbody>
    </q-markup-table>

    <q-btn
      round
      unelevated      
      size="xl"
      icon="add_circle"
      color="green"
      class="fixed-bottom-right q-my-md q-mr-md"
    />
  </q-page>
</template>

<script>
import { defineComponent, reactive, computed } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
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
    ]);

    const totalCalories = computed(() => {
      let total = 0;
      foods.forEach((food) => {
        total += food.calories;
      });
      return total;
    });

    const progress = (totalCalories.value / targetCalories) * 100;

    return {
      foods,
      targetCalories,
      totalCalories,
      progress,
    };
  },
});
</script>

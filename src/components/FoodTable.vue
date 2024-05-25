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
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FoodTable",
});
</script>

<style lang=""></style>

<template>
    <q-card
      flat
      style="font-size: 1rem"
      class="row items-center justify-evenly q-py-xl"
    >
      <div class="text-center">
        <span class="text-bold">{{ caloriesEaten }}</span> Calories<br />eaten
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
            <span style="font-size: 1.3rem" class="text-bold">
              {{ targetCalories - totalCalories }}
            </span>
            <br />
            <span class="text-caption">to go</span>
          </span>
        </q-circular-progress>
        <div class="text-center q-mt-md">
          Target: <span class="text-bold">{{ Number(targetCalories) }}</span>
        </div>
      </div>

      <div class="text-center">
        Body weight<br /><span class="text-bold">{{ Number(bodyWeight) }} lbs</span>
      </div>
    </q-card>
</template>

<script>
import {defineComponent} from "vue"

export default defineComponent({
  name: "SumaryBanner"
})
</script>

<style lang=""></style>
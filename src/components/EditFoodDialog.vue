<template>
  <q-dialog ref="dialogRef">
    <q-card>
      <q-card-section>
        <div class="text-subtitle2">Edit food</div>
      </q-card-section>

      <q-card-section class="row no-wrap">
        <q-input label="Food" class="col-8" v-model="entry.name" autofocus/>
        <q-separator vertical inset class="q-mx-sm" />
        <q-input label="Calories" type="number" v-model="entry.calories" />
      </q-card-section>
      <q-card-section class="row">
        <q-space />
        <q-btn
          flat
          no-caps
          color="orange"
          label="Cancel"
          @click="dialogRef.hide()"
        />
        <q-btn flat color="green" label="Ok" @click="updateFood()" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useDialogPluginComponent } from "quasar";
export default defineComponent({
  name: "EditFoodDialog",
  props: {
    food: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const { dialogRef } = useDialogPluginComponent();
    const entry = ref({
      id: props.food.id,
      name: props.food.name,
      calories: props.food.calories,
    });

    function updateFood() {
      context.emit("ok", entry.value);
      dialogRef.value.hide();
    }

    return {
      dialogRef,
      entry,
      updateFood,
    };
  },
});
</script>
<style scoped lang="scss"></style>

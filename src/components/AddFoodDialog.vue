<template>
  <q-dialog ref="dialogRef">
    <q-card>
    <q-card-section>
      <div class="text-subtitle2">Add food</div>
    </q-card-section>
      <q-card-section class="row no-wrap">
        <q-input 
        label="Food" 
        class="col-8" 
        v-model="entry.foodName" />
      <q-separator vertical inset class="q-mx-sm" />
        <q-input
          label="Calories"
          v-model="entry.Calories"
        />
    </q-card-section>
    <q-card-section class="row">
      <q-space/>
      <q-btn
        flat
        no-caps
        color="orange"
        label="Cancel"
        />
        <q-btn
        flat
        no-caps
        color="green"
        label="Ok"
      />
    </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, reactive } from "vue";
import { useDialogPluginComponent } from 'quasar'
export default defineComponent({
  name: 'AddFoodDialog',
  setup(){
    const { dialogRef } = useDialogPluginComponent()
    const entry = reactive({
      foodName: "",
      Calories: 0
    })
    return {
      dialogRef,
      entry
    }
  }
})
</script>
<style scoped lang="scss">
  
</style>
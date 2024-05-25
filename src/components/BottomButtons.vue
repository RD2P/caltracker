<template>
    <div class="fixed-bottom-right q-mb-md q-mr-md column q-gutter-y-md">
      <q-btn
        round
        :color="bodyWeight > 0 ? 'orange' : 'red'"
        icon="scale"
        @click="editBodyWeight()"
      />
      <q-btn round color="blue-6" icon="content_copy" @click="copy()" />
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BottomButtons",
});
</script>

<style lang=""></style>

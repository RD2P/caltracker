<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-card-section>
        <div class="text-bold text-center" style="font-size:1rem;">Caltracker</div>
      </q-card-section>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

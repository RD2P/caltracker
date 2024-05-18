<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row justify-center">
        <div class="text-center">Caltracker</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'MainLayout',
})
</script>

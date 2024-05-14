<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row items-center justify-between">
        <q-btn label="May 13th, 2024" flat  />
        <q-btn label="Today" flat/>
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

  components: {
  },

  setup () {

    return {
  
    }
  }
})
</script>

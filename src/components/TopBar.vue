<template>
  <div class="row no-wrap justify-between items-center q-px-lg">
    <div class="text-center q-py-md text-subtitle2">
      {{ formattedDate() }}
    </div>
    <div>
      <q-btn-dropdown
        flat
        dropdown-icon="settings"
        size="sm"
        color="grey-7"
        auto-close
        :menu-offset="[0, 16]"
      >
        <q-list>
          <q-item>
            <q-item-section>
              <q-btn
                unelevated
                square
                color="blue-6"
                label="Target Calories"
                icon-right="edit"
                no-caps
                @click="editTargetCalories()"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn
                unelevated
                square
                label="flush"
                color="red-6"
                icon-right="delete"
                @click="flush()"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { formattedDate } from "src/services/helpers.js";

export default defineComponent({
  name: "TopBar",

  setup() {
    return {
      formattedDate
    }
  }
});
</script>

<style lang=""></style>

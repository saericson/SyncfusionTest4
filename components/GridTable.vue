<template>
  <v-container >
    <ejs-grid ref="grid" :data-source="table.data">
      <e-columns>
        <e-column
          v-for="(col, i) in table.cols"
          :key="i"
          :field="col.col"
          :header-text="col.head"
          :width="col.width"
          :text-align="col.align"
          :format="col.format"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </v-container>
  
</template>

<script>
import Vue from 'vue'
import { GridPlugin } from '@syncfusion/ej2-vue-grids'

Vue.use(GridPlugin)

export default {
  name: 'GridTable',
  props: {
    table: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>

<style></style>

<template>
  <v-row>
    <v-col class="text-center"> 
      <grid-table :table="crossTab1"></grid-table>

    </v-col>
  </v-row>
</template>

<script>
import GridTable from '~/components/GridTable.vue'
export default {
  name: 'InspirePage',
  components: { GridTable },
  data() {
    return {
      parms: [],
    }
  },
  computed: {
    crossTab1() {
      return this.crossTabSeries('bu', 'lob', 'prem', 'C0')
    },
  },
  mounted() {
    this.parms = this.initParms()
  },
  methods: {
    initParms() {
      this.$store.dispatch('simParms/INIT_PARMS')
      const temp = this.arrayCopy(this.$store.state.simParms.parms)
      return temp
    },
    arrayCopy(arr) {
      let temp = arr.map((e, idx) => Object.assign({ idx }, e))
      temp = temp.map((e) => {
        delete e.idx
        return e
      })
      return temp
    },
    crossTabSeries(row, col, val, fmt) {
      const data = this.crossTab(this.parms, row, col, val)
      const cols = Object.keys(data[0]).map((e) => {
        return {
          col: e,
          head: e,
          width: 40,
          format: fmt,
          align: 'Right',
        }
      })
      cols[0].align = 'Left'
      return { data, cols }
    },
    crossTab(arr, rows, cols, value) {
      const uniqRows = this.uniqueItems(arr, rows)
      const uniqCols = this.uniqueItems(arr, cols)
      const res = []
      uniqRows.forEach((row) => {
        const tabRow = {}
        tabRow[rows] = row
        uniqCols.forEach((col) => {
          tabRow[col] = arr.filter(
            (e) => e[rows] === row && e[cols] === col
          )[0][value]
        })
        res.push(tabRow)
      })
      return res
    },
    uniqueItems(arr, fld) {
      arr = this.arrayCopy(arr)
      let uniqueArr = arr.map((e) => e[fld])
      uniqueArr = [...new Set(uniqueArr)]
      return uniqueArr
    },
  },
}
</script>

import Table from './src/index.vue'

Table.install = (Vue) => {
  Vue.component(Table.name, Table)
}

export default Table

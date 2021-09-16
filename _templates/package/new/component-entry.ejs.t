---
to: packages/<%= h.changeCase.param(name) %>/index.js
---
import <%= h.changeCase.pascal(name) %> from './src/index.vue'

<%= h.changeCase.pascal(name) %>.install = (Vue) => {
  Vue.component(<%= h.changeCase.pascal(name) %>.name, <%= h.changeCase.pascal(name) %>)
}

export default <%= h.changeCase.pascal(name) %>

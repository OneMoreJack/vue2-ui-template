---
to: packages/<%= h.changeCase.param(name) %>/src/index.vue
---
<template>
  <div class="zb-<%= h.changeCase.param(name) %>">
  
  </div>
</template>

<script>
export default {
  name: 'Zb<%= h.changeCase.pascal(name) %>',
}
</script>

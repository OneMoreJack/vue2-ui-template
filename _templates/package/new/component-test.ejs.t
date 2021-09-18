---
to: packages/<%= h.changeCase.param(name) %>/__tests__/<%= h.changeCase.param(name) %>.spec.js
---
import { shallowMount } from '@vue/test-utils';
import <%= h.changeCase.pascal(name) %> from '../src/index.vue';

function factory(opts = {}) {
  return shallowMount(<%= h.changeCase.pascal(name) %>, opts);
}

describe('<%= h.changeCase.pascal(name) %>', () => {
  const wrapper = factory();
  
})

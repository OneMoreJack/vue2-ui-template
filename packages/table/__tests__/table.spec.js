import { shallowMount } from '@vue/test-utils';
import Table from '../src/index.vue';

function factory(opts = {}) {
  return shallowMount(Table, opts);
}

describe('Table', () => {
  const wrapper = factory();
  
});

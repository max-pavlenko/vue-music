import {shallowMount} from "@vue/test-utils";
import {describe, expect, it, test} from 'vitest';
import AboutView from "@/views/AboutView.vue";

describe(('About'), () => {
   test('renders header properly', () => {
      const wrapper = shallowMount(AboutView);
      expect(wrapper.text()).toContain('This is an about page');
   });
})

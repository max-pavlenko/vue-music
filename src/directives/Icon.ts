import type {Directive} from 'vue';

export const Icon: Directive = {
   beforeMount: (el, {value}) => {
      el.insertAdjacentHTML('beforeend', `<i class="fa fa-${value}"/>`)
   }
}

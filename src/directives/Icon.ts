import type {Directive} from "vue";

export const Icon = {
   beforeMount: (el, {value}) => {
      el.insertAdjacentHTML('beforeend', `<i class="fa fa-${value}"/>`)
   }
} as Directive<HTMLElement, string>

<template>
   <div>
      <label :for="name" class="inline-block mb-2 capitalize">{{ formattedInputName }}</label>

      <Field :as="fieldElement($attrs)" v-bind="$attrs" :name="name"
             class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
         <slot />
      </Field>
      <ErrorMessage :name="name" class="text-red-600"/>
   </div>
</template>

<script setup lang="ts">
import {ErrorMessage, Field} from "vee-validate";
import {computed, toRefs} from "vue";

type Props = {
   name: string
};

const props = defineProps<Props>();
const {name} = toRefs(props);


const formattedInputName = computed(() => {
   return name.value.split(/[_.,;:]/g).join(' ');
});
const fieldElement = computed(() => ($attrs: Record<string, unknown>) => {
   return $attrs.as || 'input';
});
</script>

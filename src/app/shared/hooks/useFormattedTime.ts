import {toRefs} from "vue";

export function useFormattedTime(...args: number[]) {
   return toRefs(args.map((time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
   }))
}

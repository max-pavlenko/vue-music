import {songsCollection} from "@/includes/firebase";

export async function getSongByID(id: string) {
   const doc = songsCollection.doc(id.toString());
   const snapshot = await doc.get();

   return {snapshot, doc};
}

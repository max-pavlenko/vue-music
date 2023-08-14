import type {Comment, Song} from "@/app/shared/types";
import firebase, {auth, commentsCollection, db, increment, songsCollection} from "@/includes/firebase";
import OrderByDirection = firebase.firestore.OrderByDirection;

export async function getSongComments(songID: Song['id'], orderDirection: OrderByDirection) {
   let comments: Comment[] = [];
   const snapshot = await commentsCollection
       .where('songID', '==', songID)
       .orderBy('date', orderDirection)
       .get();
   snapshot.forEach((doc) => {
      comments.push({
         ...doc.data(),
      } as Comment)
   });
   return comments;
}

export async function saveCommentToFirebase({comment, songID}: { comment: string, songID: string }) {
   const newComment: Comment = {
      id: crypto.randomUUID(),
      content: comment,
      date: new Date().toString(),
      songID,
      authorID: auth.currentUser?.uid!,
      authorName: auth.currentUser?.displayName || 'Anonymous',
   };
   const batch = db.batch();
   batch.set(commentsCollection.doc(newComment.id), newComment);
   batch.update(songsCollection.doc(songID), {
      commentsCount: increment(1)
   });
   await batch.commit();
}

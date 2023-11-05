import firebase, {auth, commentsCollection, db, increment, songsCollection, storage} from '@/includes/firebase';
import {Audio, Song} from '@/app/features/music/models/audio';
import {Comment} from '@/app/features/music/models/comment';
import {toastError} from '@/app/shared/config/toast';
import {UpdateSongRequest} from '@/app/features/music/models/form-edit-song';
import OrderByDirection = firebase.firestore.OrderByDirection;

export class SongService {
   
   static async getAll() {
      return (await songsCollection.get()).docs.map((doc) => ({id: doc.id, ...(doc.data() as Audio)}));
   }
   
   static async getByID(id: string) {
      try {
         const doc = songsCollection.doc(id);
         const snapshot = await doc.get();
         
         return {snapshot, doc};
      } catch (e) {
         toastError(e);
      }
   }
   
   static async getComments(songID: Song['id'], orderDirection: OrderByDirection) {
      let comments: Comment[] = [];
      const snapshot = await commentsCollection
          .where('songID', '==', songID)
          .orderBy('date', orderDirection)
          .get();
      snapshot.forEach((doc) => {
         comments.push({
            ...doc.data(),
         } as Comment);
      });
      return comments;
   }
   
   static async postComment({comment, songID}: { comment: string, songID: string }) {
      if(!auth.currentUser) return toastError('You must be logged in to comment');
      const {uid, displayName} = auth.currentUser;
      const newComment: Comment = {
         id: crypto.randomUUID(),
         content: comment,
         date: new Date().toString(),
         songID,
         authorID: uid,
         authorName: displayName ?? 'Anonymous',
      };
      const batch = db.batch();
      batch.set(commentsCollection.doc(newComment.id), newComment);
      batch.update(songsCollection.doc(songID), {
         commentsCount: increment(1)
      });
      await batch.commit().catch((e) => {
         toastError(e);
      });
   }
   
   static async update({id, genre, song_title}: UpdateSongRequest) {
      return songsCollection.doc(id).update({
         modifiedName: song_title,
         genre,
      }).catch((e) => {
         toastError(e);
      });
   }
   
   static async delete({id, originalName}: Song) {
      try {
         const storageRef = storage.ref();
         const songRef = storageRef.child(`/songs/${originalName}`);
         await Promise.all([
            ...await this.getCommentsToDelete(id),
            songRef.delete(),
            songsCollection.doc(id).delete(),
         ]);
      } catch (e) {
         toastError(e);
      }
   }
   
   static async getCommentsToDelete(songID: Song['id']) {
      const commentsSnapshot = await commentsCollection.where('songID', '==', songID).get();
      
      return commentsSnapshot.docs.map(commentDoc => commentDoc.ref.delete());
   }
   
   static async getByAuthorID(authorID = auth.currentUser!.uid) {
      const songsSnapshot = await songsCollection.where('creatorID', '==', authorID).get();
      return songsSnapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
      }) as Song);
   }
}

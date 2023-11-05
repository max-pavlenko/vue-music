import firebase from '@/includes/firebase';

export function isFirebaseError(e: unknown): e is firebase.FirebaseError {
   return typeof e === 'object' && e !== null && 'code' in e && 'message' in e;
}

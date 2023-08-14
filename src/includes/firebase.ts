import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
   apiKey: "AIzaSyBgBZU_pnyIybA_dgQp1udwL0JnTlwaE38",
   authDomain: "vue-music-a5c3b.firebaseapp.com",
   projectId: "vue-music-a5c3b",
   storageBucket: "vue-music-a5c3b.appspot.com",
   messagingSenderId: "444749461872",
   appId: "1:444749461872:web:a096c725eaf9ac97f777b5",
   measurementId: "G-43ZZ3TVXS6"
};

let app: firebase.app.App | undefined;
if (!firebase.apps.length) {
   app = firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth(app);
const db = firebase.firestore(app);
db.enablePersistence().catch(er => {console.log(er.code, 'er.code')});
const storage = firebase.storage(app);
const increment = firebase.firestore.FieldValue.increment;

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
   auth,
   db,
   storage,
   usersCollection,
   songsCollection,
   commentsCollection,
   increment,
}

export default firebase;

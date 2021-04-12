import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC1b3dEVXZPI8h5pqparEezfjWzEncO6Mg",
  authDomain: "whatsapp-clone-f0453.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-f0453-default-rtdb.firebaseio.com",
  projectId: "whatsapp-clone-f0453",
  storageBucket: "whatsapp-clone-f0453.appspot.com",
  messagingSenderId: "718629200305",
  appId: "1:718629200305:web:abf818621661680db51d90"
};

const firebaseapp=firebase.initializeApp(firebaseConfig);
const database=firebaseapp.firestore();

export default database;

import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// import { seedDatabase } from '../seed';

// seeding the database
const config = {
  apiKey: 'AIzaSyCXD4L8Z2sDFm9fx2Vo5AvRCLCD_nE38Nc',
  authDomain: 'netflix-3128d.firebaseapp.com',
  projectId: 'netflix-3128d',
  storageBucket: 'netflix-3128d.appspot.com',
  messagingSenderId: '618989699844',
  appId: '1:618989699844:web:9b28a666cd71dc15250651',
};

const firebase = Firebase.initializeApp(config);
// seedDatabase(firebase)

export {firebase} ;

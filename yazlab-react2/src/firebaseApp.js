
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBX2T9IlJnOyvOAppPXBfo90UxV9kPi7yI",
    authDomain: "yazlab2-2b538.firebaseapp.com",
    databaseURL: "https://yazlab2-2b538-default-rtdb.firebaseio.com",
    projectId: "yazlab2-2b538",
    storageBucket: "yazlab2-2b538.appspot.com",
    messagingSenderId: "728530122171",
    appId: "1:728530122171:web:f82439b2d2f4dcfc2dc09e",
    measurementId: "G-WRFLV2TJDM"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


export { firestore };

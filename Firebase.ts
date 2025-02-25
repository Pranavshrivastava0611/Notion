import { initializeApp,getApp,getApps} from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmQ1nETKeK57d1ZNd29wcCazYp0iykwS0",
    authDomain: "notion-clone-587ac.firebaseapp.com",
    projectId: "notion-clone-587ac",
    storageBucket: "notion-clone-587ac.appspot.com",
    messagingSenderId: "990339009144",
    appId: "1:990339009144:web:c6394896af85ea2ad2bb8d",
    measurementId: "G-VVBWRF5LRK"
  };


  // inittaliation checking of the app ; // next js double initilaizse checking

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
 const db = getFirestore(app);
 
 export {db};


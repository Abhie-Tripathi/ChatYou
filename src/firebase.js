import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDXu75CgwKfxk8aaL1YHIOcoiwD_cISBuk",
    authDomain: "chatyou-78472.firebaseapp.com",
    projectId: "chatyou-78472",
    storageBucket: "chatyou-78472.appspot.com",
    messagingSenderId: "620951717247",
    appId: "1:620951717247:web:f66f7f0064339e9e7d864a"
  };

const App = initializeApp(firebaseConfig)


const db = getFirestore(App)


const provider = new GoogleAuthProvider();

export {provider}
export default db


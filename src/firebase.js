import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD8kdapcgMusomi3nwFE7K0ck9m4GH5J24",
  authDomain: "netflix-clone-8b3f2.firebaseapp.com",
  projectId: "netflix-clone-8b3f2",
  storageBucket: "netflix-clone-8b3f2.firebasestorage.app",
  messagingSenderId: "752146321913",
  appId: "1:752146321913:web:1fc60a98a45a3cf008ad28"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export const signup = async (name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, 'user'),{
            uid:user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

export const login = async (email, password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

export const logout = ()=>{
    signOut(auth);
}

export default auth

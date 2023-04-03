import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, mainCollection } from "./credentials";

//Registro

export const registerUser = async (email, password, username) => {
  try {
      const userAuth = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userAuth.user.uid);
      //Creo el usuario en la db con el mismo id proporcionado por auth
      setDoc(doc(db, mainCollection, userAuth.user.uid), {
        id:userAuth.user.uid, 
        email,
        username,
        telefono: "",
      })
      return false
  } catch (error) {
    return error.code;
  }
};

//Login

export const loginWithEmailPassword = async (email, password) => {
  try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
  } catch (error) {
      return undefined;
  }
};

//Cerrar Sesion

export const logOut = async () => {
  try {
      await signOut(auth);
  } catch (error) {
      console.error(error);
  }
};
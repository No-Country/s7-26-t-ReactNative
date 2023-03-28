import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  setDoc
} from "firebase/firestore";
import {
  auth,
  db,
  mainCollection,
  playersCollection,
  teamsCollection,
  tournamentCollection,
} from "./credentials";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";

//Se debe especificar como string el nombre del documento con el que está guardado en la db
//puede ser un nombre establecido o id autogenerado, hay que decidir...
export const getUserData = async (user) => {
  const docRef = doc(db, mainCollection, user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return []
  }
};

//especificar nombre de la subcoleccion
//Trae todos los documentos de TODOS los documentos(padres) que tengan la subcolleccion dada
export const getAllSubCollDocs = async (subcollection) => {
  const subCollRef = await collectionGroup(db, subcollection);
  const teams = await getDocs(subCollRef);
  teams.forEach((doc) => {
    console.log(`Documento subcolleccion ${subcollection} : `, doc.id);
    console.log(doc.data());
  });
};

//Torneos creados por el usuario
export const getUserTournaments = async (user) => {
  const docRef = collection(
    db,
    `${mainCollection}/${user}/${tournamentCollection}`
  );

  const docSnap = await getDocs(docRef);
  docSnap.forEach((doc) =>
    console.log(`${doc.data().titulo} - Torneo del usuario ${user}`)
  );
};

//Equipos que participan en el torneo
export const getTournamentTeams = async (user, tournament) => {
  const docRef = collection(
    db,
    `${mainCollection}/${user}/${tournamentCollection}/${tournament}/${teamsCollection}`
  );

  const docSnap = await getDocs(docRef);
  docSnap.forEach((doc) =>
    console.log(`Equipo participante: ${doc.data().nombre}`)
  );
};

export const getTeamData = async (user, tournament, team) => {
  /* const docRef = doc(db,`${mainCollection}/${user}/${tournament}/${team}` ); */
  const docRef = doc(
    db,
    `${mainCollection}/${user}/${tournamentCollection}/${tournament}/${teamsCollection}/${team}`
  );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Team data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
//Jugadores que conforman el equipo
export const getTeamPlayers = async (user, tournament, team) => {
  const docRef = collection(
    db,
    `${mainCollection}/${user}/${tournamentCollection}/${tournament}/${teamsCollection}/${team}/${playersCollection}`
  );

  const docSnap = await getDocs(docRef);
  docSnap.forEach((doc) => console.log(`Jugador : ${doc.data().nombre}`));
};

//Registro

export const registerUser = async (email, password) => {
  try {
      const userAuth = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userAuth.user.uid);
      //Creo el usuario en la db con el mismo id proporcionado por auth
      setDoc(doc(db, mainCollection, userAuth.user.uid), {id:userAuth.user.uid, email})
      return true
  } catch (error) {
      console.log(error);
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

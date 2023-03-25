import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import {
  db,
  mainCollection,
  playersCollection,
  teamsCollection,
  tournamentCollection,
} from "./credentials";

//Se debe especificar como string el nombre del documento con el que está guardado en la db
//puede ser un nombre establecido o id autogenerado, hay que decidir...
export const getUserData = async (user) => {
  const docRef = doc(db, mainCollection, user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
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

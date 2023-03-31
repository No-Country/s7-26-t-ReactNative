import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  setDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  auth,
  db,
  mainCollection,
  playersCollection,
  teamsCollection,
  tournamentCollection,
  picturesCollection
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

//Crear Torneo
//Pido los datos de front y los paso a la collecion de Torneos
//al usar AddDoc le genera un id unico como en la funcion de registro
//si puede crearlo retorna true como respuesta si ocurre un error retorna false

export const CreateTournamentFB = async (data) => {

  try {
    const {nombre, creador, region, ciudad, deporte, imagen, descripcion} = data

    const docRef = doc(collection(db, tournamentCollection));
    await setDoc(docRef, {
      nombre,
      creador,
      region,
      ciudad,
      deporte,
      imagen,
      descripcion,
      uid: docRef.id
    });

    return true
  } catch (error) {
    console.error(error);
    return false
  }

}

//Listado de Torneos
//Lista todo sin filtrar de la collection de Torneos
//Retorna los Datos en un array, solo con las propiedades seleccionadas al hacer el map

export const ListTournaments = async () => {
  try {
    const res = await getDocs(collection(db, tournamentCollection))
    
    return res.docs.map(doc => {
      const { uid, nombre, creador, ciudad, imagen, deporte } = doc.data();
      return { uid, nombre, creador, ciudad, imagen, deporte };
    });
  } catch (error) {
    return false
  }
}

//Obtener Datos de un Torneo
//Busca en la collection de Torneos por el Uid del torneo
//si existe retorna los datos de ese torneo sino retorna false

export const getTournament = async (tournamentId) => {
  try {
    const res = await getDoc(doc(db, tournamentCollection, tournamentId))
    
    if (res.exists()) {
      return res.data()
    }

    return null
  } catch (error) {
    return false
  }
}

//Subir Fotos
//Sube fotos a la collecion de fotos y devuelve la url de la foto para ser agregada a otra collecion
//Ejemplo: si lo uso en editar perfil me retorna la url de esa foto que subi y la guardo en el campo de foto
//En la collecion de Users, pero el archivo fisico queda en el Firestore
//Todavia no esta bien implementado - 31 marzo

export const uploadProfilePicture = async (imageUri, name) => {
  try {
    const response = await fetch(imageUri);
    const blobFile = await response.blob();

    const reference = ref(picturesCollection, `fotos/${name}.jpg`);
    const result = await uploadBytes(reference, blobFile);
    const url = await getDownloadURL(result.ref);

    return url;
  } catch (error) {
    console.error(error);
  }
};
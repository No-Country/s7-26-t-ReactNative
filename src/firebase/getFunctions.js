import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { distanceInKmBetweenEarthCoordinates } from "../utils";
import {
  db,
  mainCollection,
  playersCollection,
  teamsCollection,
  tournamentCollection,
  picturesCollection,
  fixtureCollection,
} from "./credentials";

//Se debe especificar como string el nombre del documento con el que está guardado en la db
//puede ser un nombre establecido o id autogenerado, hay que decidir...
export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, mainCollection, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return docSnap.data();
    }
    return null;
  } catch (error) {
    return false;
  }
};

//Torneos creados por el usuario
export const getUserTournaments = async (userId) => {
  try {
    const colRef = collection(
      db,
      `${mainCollection}/${userId}/${tournamentCollection}`
    );
    
    const docSnap = await getDocs(colRef);
    return docSnap.docs.map((doc) => doc.data());
    /* return docSnap.docs.map((doc) => {
      const { uid, nombre, ciudad, imagen, deporte } = doc.data();
      return { uid, nombre, ciudad, imagen, deporte }; 
    }); */
    /*    
 const list = []
    docSnap.forEach((doc) =>
      list.push(doc.data())
    );
    return list */
  } catch (error) {
    return false;
  }
};

//Equipos que participan en el torneo
export const getTournamentTeams = async (userId, tournamentId) => {
  try {
    const colRef = collection(
      db,
      `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}/${teamsCollection}`
    );

    const docSnap = await getDocs(colRef);
    return docSnap.docs.map((doc) => doc.data());
    /* const list = [];
    docSnap.forEach((doc) => list.push(doc.data()));
    return list; */
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getTeamData = async (userId, tournamentId, teamId) => {
  /* const docRef = doc(db,`${mainCollection}/${user}/${tournament}/${team}` ); */
  try {
    const docRef = doc(
      db,
      `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}/${teamsCollection}/${teamId}`
    );
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    return false;
  }
};

//Jugadores que conforman el equipo
export const getTeamPlayers = async (userId, tournamentId, teamId) => {
  try {
    const colRef = collection(
      db,
      `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}/${teamsCollection}/${teamId}/${playersCollection}`
    );

    const docSnap = await getDocs(colRef);
    return docSnap.docs.map((doc) => doc.data());
  } catch (error) {
    return false;
  }
};

//Fixture
export const getFixture = async (userId, tournament) => {
  try {
    const colRef = collection(
      db,
      `${mainCollection}/${userId}/${tournamentCollection}/${tournament}/${fixtureCollection}`
    );
    let fechas = [];
    const docSnap = await getDocs(colRef);
    docSnap.forEach((doc) => fechas.push(doc.data()));
    /* console.log("Fechas", fechas) */
    return fechas;
    /* return docSnap.docs.map((doc) => doc.data()); */

    /* docSnap.forEach((doc) => {
      fechas.push(doc.data())
    });
    console.log("variable ", fechas)
    return fechas */
  } catch (error) {
    return false;
  }
};


//Listado de Torneos
//Lista todo sin filtrar de la collection de Torneos
//Retorna los Datos en un array, solo con las propiedades seleccionadas al hacer el map

export const ListAllTournaments = async () => {
  try {
    const res = await getDocs(collectionGroup(db, tournamentCollection));

    return res.docs.map(
      (doc) => doc.data() /* {
      const { uid, nombre, creador, ciudad, imagen, deporte } = doc.data();
      return { uid, nombre, creador, ciudad, imagen, deporte };
    } */
    );
  } catch (error) {
    return false;
  }
};

//Obtener Datos de un Torneo
//Busca en la collection de Torneos por el Uid del torneo
//si existe retorna los datos de ese torneo sino retorna false
export const getTournament = async (tournamentId) => {
  try {
    const res = await getDocs(collectionGroup(db, tournamentCollection))
    return res.docs.map(doc => doc.data()).filter(data => data.id === tournamentId)

//No me funciona traer el documento filtrado desde firebase. 
//Puedo consologuearlo pero cuando llamo la funcnion en viewTournament no me muestra el documento. 

    /* const q = query(collectionGroup(db, tournamentCollection), where("id", "==", tournamentId))
    let cities = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          cities.push(doc.data().nombre);
      });
      console.log(cities)
    })
    return cities */


  } catch (error) {
    console.log(error)
    return false;
  }
};



/* export const getUserTournament = async (userId, tournamentId) => {
  try {
    const res = await getDoc(
      doc(
        db,
        `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}`
      )
    );

    if (res.exists()) {
      return res.data();
    }

    return null;
  } catch (error) {
    return false;
  }
}; */

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

export const getNearTournaments = async (lat, lng, maxDistance) => {
  try {
    const querySnapshot = await getDocs(collectionGroup(db, tournamentCollection));

    const nearTournaments = [];

    querySnapshot.forEach((doc) => {
      const tournament = doc.data();

      const tournamentDistance = distanceInKmBetweenEarthCoordinates(
        lat,
        lng,
        tournament.latitud,
        tournament.longitud
      );

      if (tournamentDistance <= maxDistance) {
        nearTournaments.push({ id: doc.id, ...tournament });
      }
    });

    return nearTournaments;
  } catch (error) {
    console.error(error);
  }
};

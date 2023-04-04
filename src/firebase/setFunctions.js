//Crear Torneo
//Pido los datos de front y los paso a la collecion de Torneos
//al usar AddDoc le genera un id unico como en la funcion de registro
//si puede crearlo retorna true como respuesta si ocurre un error retorna false

import { collection, doc, setDoc } from "firebase/firestore";
import { db, mainCollection, tournamentCollection } from "./credentials";

export const CreateTournamentFB = async (userId, data) => {
  try {
    const {
      nombre,
      creador,
      direccion,
      latitud,
      longitud,
      deporte,
      imagen,
      descripcion,
    } = data;

    const docRef = doc(
      collection(db, `${mainCollection}/${userId}/${tournamentCollection}`)
    );
    await setDoc(docRef, {
      nombre,
      creador,
      direccion,
      latitud,
      longitud,
      deporte,
      imagen,
      descripcion,
      id: docRef.id,
      userId: userId,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
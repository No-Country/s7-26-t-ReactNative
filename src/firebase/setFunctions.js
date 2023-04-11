import { collection, doc, setDoc } from "firebase/firestore";
import {
  db,
  fixtureCollection,
  mainCollection,
  teamsCollection,
  tournamentCollection,
} from "./credentials";

//Crear Torneo
//Pido los datos de front y los paso a la collecion de Torneos
//al usar AddDoc le genera un id unico como en la funcion de registro
//si puede crearlo retorna true como respuesta si ocurre un error retorna false
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

export const CreateTeam = async (userId, tournamentId, data) => {
  try {
    const { nombre, imagen } = data;

    const docRef = doc(
      collection(
        db,
        `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}/${teamsCollection}`
      )
    );
    await setDoc(docRef, {
      nombre,
      imagen: imagen,
      golesAFavor: 0,
      golesEnContra: 0,
      partidosGanados: 0,
      partidosEmpatados: 0,
      partidosPerdidos: 0,
      partidosJugados: 0,
      puntos: 0,
      tarjetasAmarillas: 0,
      tarjetasRoajas: 0,
      id: docRef.id,
      tournamentId: tournamentId,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const setFixtureDB = async (userId, tournamentId, data) => {
  try {
    const { match, player1, player2, round } = data;

    const docRef = doc(
      collection(
        db,
        `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}/${fixtureCollection}`
      )
    );

    setDoc(docRef, {
      id: docRef.id,
      tournamentId: tournamentId,
      match,
      player1,
      player2,
      round,
      golesLocal: 0,
      golesVisitante: 0,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

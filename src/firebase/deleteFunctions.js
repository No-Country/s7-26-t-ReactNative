import { doc, deleteDoc } from "firebase/firestore";
import { db, mainCollection, teamsCollection, tournamentCollection } from "./credentials";

export const deleteTeam = async ( userId, tournamentId, teamId) => {
  try{
    await deleteDoc(doc(db,
    `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}/${teamsCollection}/${teamId}`));
    return true
  } catch (error){
    console.log(error);
    return false
  }
}
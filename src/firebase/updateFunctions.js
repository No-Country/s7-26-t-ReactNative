import { doc, updateDoc } from "firebase/firestore";
import { db, fixtureCollection, mainCollection, teamsCollection, tournamentCollection } from "./credentials";

export const updateTeam = async (userId, tournamentId, teamId, data) => {
  try {
    await updateDoc(
      doc(
        db,
        `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}/${teamsCollection}/${teamId}`
      ),
      data
    );
    return true
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateGoals = async (userId, tournamentId,fixtureId, goals) =>{
  try {
    await updateDoc(
      doc(
        db,
        `${mainCollection}/${userId}/${tournamentCollection}/${tournamentId}/${fixtureCollection}/${fixtureId}`
      ),
      goals
    )
    return true
  } catch (error) {
    console.error(error);
    return false;
  }
}
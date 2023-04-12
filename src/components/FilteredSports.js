import { useEffect, useState } from "react"
import Tournaments from "./Tournaments"
import { View, Text } from "react-native"
import { ListSpecificTournaments } from "../firebase/getFunctions"

export const FilteredSports = ({ selected, setSelected }) => {
  const [sport, setSport] = useState(null)



  
  useEffect(() => {
   
    const getFilteredSports = async () => {
      const sports = await Promise.all(
        selected.map(async (item) => {
          const data = await ListSpecificTournaments(item.deporte)
          return data ? data : null
        })
      )
      setSport(sports)
    }
    getFilteredSports()
  }, [selected])

  
 useEffect(() => {
    
   return () => {
     setSelected([])
    
   }
 }, [])
 

  
  if (!sport) {
    return <Text className="text-white">Loading...</Text>
  }

  return (
    <>
      {sport.map((item, index) => (
        <Tournaments data={item} fromHome={false}/>
      ))}
    </>
  )
}
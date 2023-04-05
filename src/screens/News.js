import Constants from "expo-constants";
import { Children, useEffect, useState } from "react"
import { View, Text } from "react-native"

export default function News(){

  const [news, setNews] = useState([])


  /*
  Retorna un objeto con estas propiedades

  {
    "id": 14919,
    "name": "2023 Sailing World Cup",
    "year": 2023,
    "dateFrom": "2023-03-31T00:00:00",
    "dateTo": "2023-04-08T00:00:00",
    "competitionId": 269,
    "competition": "Sailing World Cup",
    "sportId": 47,
    "sport": "Sailing",
    "continentId": 2,
    "continent": "World",
    "dateModified": "2023-03-28T14:09:40.973",
    "date": "31 March - 8 April 2023",
    "url": "https://allsportdb.com/Events/2023-Sailing-World-Cup-14919",
    "status": "",
    "webUrl": "http://www.trofeoprincesasofia.org",
    "wikiUrl": "https://en.wikipedia.org/wiki/Sailing_World_Cup",
    "twitterUrl": "https://twitter.com/search?q=%40WorldSailing%20OR%20%23SailingWorldCup%20OR%20%40TrofeoSofia",
    "facebookUrl": "https://www.facebook.com/TrofeoPrincesaSofia",
    "location": [
      {
        "id": 28,
        "regionId": null,
        "name": "Spain",
        "code": "es",
        "locations": [
          {
            "id": 3876,
            "name": "Palma de Mallorca"
          }
        ],
        "continentId": 3,
        "continent": "Europe"
      }
    ]
  },

  */

  async function getNews(){
    const data = await fetch("https://api.allsportdb.com/v3/calendar",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Constants.expoConfig.extra.newsKey}`
      }
    })

    setNews(await data.json())
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <View>
      {
        news.length > 0?
        Children.toArray(
          news.map(newData => (
            <Text>{newData.name}</Text>
          ))
        )
        :
        <Text>Cargando..</Text>
      }
    </View>
  )
}

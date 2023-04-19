import { Children } from "react"
import { ScrollView, Text, View, Image, Linking, Pressable } from "react-native"
import { Torneopalooza } from "../components/icons"
import { RootColors } from "../theme"
import { FontAwesome } from "@expo/vector-icons"

export default function AboutUs() {

  const {colors} = RootColors

  const Developers = [
    {
        "id" : 1,
        "name" : "Nicolás Radín",
        "about" : "Desarrollador Web, Mobile",
        "role" : "FullStack",
        "github": "https://github.com/niicodeer",
        "linkedin" : "https://www.linkedin.com/in/nico-radin",
        "pic": "https://media.licdn.com/dms/image/C4E03AQFXe5oPUVi8Ig/profile-displayphoto-shrink_400_400/0/1663712246682?e=1687392000&v=beta&t=-p_EQ_yBGVlPVCSrIWT-hkeGMvhIaJeaD27v6HAy1qY"
    },
    {
        "id" : 2,
        "name" : "Nicolás Roberto",
        "about" : "Desarrollador Web, Mobile",
        "role" : "Frontend",
        "github": "https://github.com/nicolasroberto",
        "linkedin": "https://www.linkedin.com/in/nicolás-roberto",
        "pic": "https://avatars.githubusercontent.com/u/84945745?v=4"
    },
    {
        "id" : 3,
        "name" : "Ezequiel Berretta",
        "about" : "Desarrollador Web, Mobile",
        "role" : "Frontend",
        "github": "https://github.com/rretta",
        "linkedin": "https://www.linkedin.com/in/ezequiel-berretta-b1187821b",
        "pic": "https://media.licdn.com/dms/image/D4D03AQFBRS_jyNQoAw/profile-displayphoto-shrink_400_400/0/1666972004994?e=1687392000&v=beta&t=uitv8dHR9onoINlBmSCbwm9-hn6y7JPcZHPL746sk4E"
    },
    {
        "id" : 4,
        "name" : "Mariana Camisasca",
        "about" : "Diseñadora UX, UI",
        "role" : "UX/UI",
        "behance": "https://www.behance.net/mcamisasca",
        "linkedin": "https://www.linkedin.com/in/mariana-camisasca",
        "pic": "https://mir-s3-cdn-cf.behance.net/user/230/4ce5cf641658323.640658a7b7638.jpg"
    },
    {
        "id" : 5,
        "name" : "Alexander Mamani",
        "about" : "Desarrollador Web, Mobile",
        "role" : "FullStack",
        "github": "https://github.com/alexqs96",
        "linkedin": "https://www.linkedin.com/in/alexander-mamani",
        "pic": "https://avatars.githubusercontent.com/u/72415956?v=4"
    }
]

  return (
    <>
    <ScrollView className="bg-white">
      <View className="w-[85%] mx-auto pb-16">

        <View className="items-center my-5 bg-white border border-black/5 px-4 pb-4 pt-6 rounded-lg"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 0,
        }}
        >
          <Torneopalooza width={200} height={50} color={colors.yellow}/>
          <Text className="text-sm font-semibold mt-5">
            Torneopalooza fue desarrollada en React Native usando las tecnologias de NativeWind para estilar la Aplicación
            para gestionar las demas funciones se utilizo Firebase para la autenticación, Funciones, Base de Datos y Servidor de Imagenes
          </Text>
        </View>

        <View className="flex justify-center items-center">
          <Text className="font-bold text-4xl tracking-widest mt-1 mb-5 bg-[#F0C05A] px-3 pb-1 pt-1.5 text-white">Developers</Text>
            <View className="flex justify-center items-center flex-wrap flex-row gap-2">
            {
              Children.toArray(
                Developers.map(dev => (
                  <View className="flex flex-row items-start bg-white border border-black/5 p-4 mb-1 rounded-lg max-w-lg" 
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.05,
                      shadowRadius: 3,
                      elevation: 0,
                    }}>
                    <Image
                      className={"mr-3 w-[100px] h-[100px] rounded-md mb-auto"}
                      resizeMode="cover"
                      source={{
                          uri: dev.pic
                      }}
                    />
                    <View className="shrink w-full">
                      <Text className="font-bold text-base">{dev.name}</Text>
                      <View className="flex flex-row justify-start items-center mb-1">
                        <Text className="font-bold text-white p-1 bg-[#F0C05A]">{dev.role}</Text>
                      </View>
                      <Text className="font-medium w-[130]">{dev.about}</Text>
                    </View>

                    <View className="flex items-center">
                    {
                      dev.github?
                      <Pressable className="mt-0.5" onPress={() => Linking.openURL(dev.github)}>
                        <FontAwesome name="github" color={colors.yellow} size={20} />
                      </Pressable>
                      :
                      <Pressable className="mt-0.5" onPress={() => Linking.openURL(dev.behance)}>
                        <FontAwesome name="behance" color={colors.yellow} size={20} />
                      </Pressable>
                    }
                    <Pressable className="mt-1" onPress={() => Linking.openURL(dev.linkedin)}>
                      <FontAwesome name="linkedin" color={colors.yellow} size={20} />
                    </Pressable>
                    </View>
                  </View>
                ))
              )
            }
          </View>
        </View>
      </View>
    </ScrollView>
    </>
  )
}

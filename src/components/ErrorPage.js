
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import {  Working } from "./icons";

export const ErrorPage = () => {
    const { colors } = useTheme();

    return (
        <ScrollView>
        <View className={`text-center flex items-center bg-violet-200 rounded-xl p-6 m-4`}>
            <Text className="text-center text-2xl font-bold">
                Ups!
            </Text>
            <Text className=" text-center text-2xl font-bold">
                No hay nada aquí...aún
            </Text>
            <Working width={280} height={350}/>
            <Text className=" text-center text-xl">
                Por el momento esta función no está disponible, pero estamos trabajando duro para poder agregarla pronto!
            </Text>
        </View>
        </ScrollView>
    );
};


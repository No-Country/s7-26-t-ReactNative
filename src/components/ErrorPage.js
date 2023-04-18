
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import {  Working } from "./icons";

export const ErrorPage = () => {
    const { colors } = useTheme();

    return (
        <View className="text-center px-4">
            <Text className="text-2xl font-bold">
                Ups!
            </Text>
            <Text className="text-2xl font-bold">
                No hay nada aquí...aún
            </Text>
            <Working width={350} height={350}/>
            <Text className="text-xl">
                Por el momento esta función no está disponible, pero estamos trabajando duro para poder agregarla pronto!
            </Text>
        </View>
    );
};


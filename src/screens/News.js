import Constants from "expo-constants";
import { Children, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function News() {
  return (
    <WebView
      source={{ uri: "https://noticias-torneopalooza.web.app/" }}
      style={{ flex: 1 }}
    />
  );
}

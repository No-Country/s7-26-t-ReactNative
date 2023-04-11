import Constants from "expo-constants";
import { Children, useEffect, useState } from "react";
import { WebView } from "react-native-webview";

export default function News({ cuenta }) {
  /* const [twitter, setTwitter] = useState("DeportesAR"); */
  const twitter = cuenta ? cuenta : "DeportesAR";
  return (
    <WebView
      source={{
        uri: `https://noticias-torneopalooza.web.app?cuenta=${twitter}`,
      }}
      style={{ flex: 1 }}
    />
  );
}

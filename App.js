import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Auth from "./Auth";
import useCachedResources from "./hooks/useCachedResources";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { persistor, store } from "./redux";

const theme = {
  ...DefaultTheme,
  // roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#3498db",
    // accent: "#f1c40f",
  },
};

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={theme}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
              <SafeAreaProvider>
                <NavigationContainer linking={LinkingConfiguration}>
                  <Auth />
                </NavigationContainer>
              </SafeAreaProvider>
            </View>
          </PaperProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

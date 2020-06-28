import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Appbar } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

export default function TopBarLayout({ children, navigation, title }) {
  const _goBack = () => navigation.toggleDrawer();
  return (
    <>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Action
          icon={({ size, color }) => (
            <FontAwesomeIcon icon={faBars} size={size} color={color} />
          )}
          onPress={_goBack}
        />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: 20,
  },
});

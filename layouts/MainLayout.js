import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSafeArea } from "react-native-safe-area-context";

export default function MainLayout({ children, navigation, dark }) {
  const insets = useSafeArea();
  return (
    <>
      {children}
      <TouchableOpacity
        style={{ position: "absolute", top: insets.top, left: 20 }}
        onPress={() => navigation.toggleDrawer()}
      >
        <FontAwesomeIcon
          icon={faBars}
          color={dark ? "#000" : "#fff"}
          size={30}
        />
      </TouchableOpacity>
    </>
  );
}

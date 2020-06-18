import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";

const MainLayout = ({ children, navigation, dark, disCart }) => {
  const insets = useSafeArea();
  return (
    <>
      {children}
      <TouchableOpacity
        style={[styles.icon, { top: insets.top }]}
        onPress={() => navigation.toggleDrawer()}
      >
        <Ionicons name="md-menu" size={40} color={dark ? "#000" : "#fff"} />
      </TouchableOpacity>
      {/* {!disCart && (
        <TouchableOpacity
          style={styles.cart}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.cartCount}>11</Text>
          <Feather name="shopping-cart" size={40} color="#fff" />
        </TouchableOpacity>
      )} */}
    </>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 0,
    left: 20,
  },
  cart: {
    backgroundColor: "#000",
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 70,
    height: 70,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cartCount: {
    color: "#fff",
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 1000,
  },
});

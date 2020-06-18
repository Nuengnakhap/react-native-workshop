import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Cart = ({ navigation, cart = {} }) => {
  const countCart = Object.keys(cart).length;
  return (
    <TouchableOpacity
      style={styles.cart}
      onPress={() => navigation.navigate("Cart")}
    >
      {countCart > 0 && <Text style={styles.cartCount}>{countCart}</Text>}
      <Feather name="shopping-cart" size={40} color="#fff" />
    </TouchableOpacity>
  );
};

export default Cart;

const styles = StyleSheet.create({
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

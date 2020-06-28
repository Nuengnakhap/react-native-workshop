import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-native-paper";
import { connect } from "react-redux";
import actions from "../redux/actions";

function Cart({ navigation, cart }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={{
        position: "absolute",
        backgroundColor: "#000",
        width: 60,
        height: 60,
        bottom: 10,
        right: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 1000,
      }}
    >
      <FontAwesomeIcon icon={faShoppingCart} color="#fff" size={40} />
      {Object.keys(cart.cart).length > 0 && (
        <View style={{ position: "absolute", top: -5, right: 0 }}>
          <Badge size={24}>{Object.keys(cart.cart).length}</Badge>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default connect((store) => ({ cart: store.cart }), actions)(Cart);

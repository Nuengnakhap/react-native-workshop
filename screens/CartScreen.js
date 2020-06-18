import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CartBox from "../components/CartBox";

export default class CartScreen extends Component {
  render() {
    const {
      cart: { cart },
    } = this.props;
    return (
      <ScrollView style={styles.container}>
        {Object.keys(cart).map((item, key) => (
          <CartBox key={key} {...this.props} id={item} item={cart[item]} />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
});

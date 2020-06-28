import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import CartBox from "../components/CartBox";
import { connect } from "react-redux";
import TopBarLayout from "../layouts/TopBarLayout";

export default class CartScreen extends Component {
  render() {
    const {
      cart: { cart },
    } = this.props;
    return (
      <TopBarLayout navigation={this.props.navigation} title="Cart">
        <ScrollView style={styles.container}>
          {Object.keys(cart).map((item, key) => (
            <CartBox key={key} {...this.props} id={item} item={cart[item]} />
          ))}
        </ScrollView>
      </TopBarLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
});

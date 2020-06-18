import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Actions } from "../redux/actions";

const PrivateHoc = (WarpComponent) => {
  class Private extends Component {
    render() {
      return <WarpComponent {...this.props} />;
    }
  }

  return connect(
    (store) => ({
      user: store.user,
      cart: store.cart,
      product: store.product,
    }),
    { ...Actions }
  )(Private);
};

export default PrivateHoc;

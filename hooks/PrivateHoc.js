import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import actions from "../redux/actions";

const PrivateHoc = (WarpComponent) => {
  class Private extends Component {
    render() {
      return <WarpComponent {...this.props} />;
    }
  }

  return connect(
    (store) => ({ cart: store.cart, user: store.user, product: store.product }),
    actions
  )(Private);
};

export default PrivateHoc;

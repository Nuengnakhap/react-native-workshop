import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Axios from "axios";
import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import API from "../constants/API";
import { withTheme } from "react-native-paper";

class CartBox extends Component {
  state = { product: {} };

  componentDidMount() {
    Axios.get(`${API.PRODUCT_GET}/${this.props.id}`)
      .then((res) => {
        this.setOutStock(res.data.data.stock == 0, res.data.data);
        this.setState({ product: res.data.data });
      })
      .catch((err) => console.log(err.response?.data));
  }

  setOutStock = (value = false, product) => {
    let item = { ...this.props.item };
    if (!value && item.outOfStock) {
      item.item = 1;
      item.total = Number(product.harga);
    } else {
      item.item = 0;
      item.total = 0;
    }
    item.outOfStock = value;
    this.props.setCart(item);
  };

  onIncrease = (price) => {
    let item = { ...this.props.item };
    item.item = 1;
    item.total = price;
    this.props.setCart(item);
  };

  onDecrease = (price) => {
    let item = { ...this.props.item };
    if (item.item == 1) return;
    item.item = -1;
    item.total = -price;
    this.props.setCart(item);
  };

  render() {
    const { product } = this.state;
    const {
      item,
      theme: { colors },
      deleteCart,
    } = this.props;
    let isMin = item.item == 1;
    let isMax = product.stock <= item.item;
    return (
      <View style={{ flex: 1, padding: 5 }}>
        <View
          style={[
            styles.cartBox,
            item.outOfStock && { backgroundColor: "#f8d7da" },
          ]}
        >
          <Image source={{ uri: product.photoUrl }} style={styles.cartImg} />
          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <View style={styles.group}>
              <Text style={[styles.title, { flex: 1 }]} numberOfLines={1}>
                {product.nama}
              </Text>
              {!item.outOfStock ? (
                <View style={styles.group}>
                  <TouchableOpacity
                    onPress={() => this.onIncrease(Number(product.harga))}
                    disabled={isMax}
                  >
                    <Feather
                      name="plus-circle"
                      size={30}
                      color={!isMax ? colors.primary : colors.disabled}
                    />
                  </TouchableOpacity>

                  <TextInput
                    style={styles.inp}
                    editable={false}
                    value={item.item.toString()}
                  />
                  <TouchableOpacity
                    onPress={() => this.onDecrease(Number(product.harga))}
                    disabled={isMin}
                  >
                    <Feather
                      name="minus-circle"
                      size={30}
                      color={!isMin ? colors.primary : colors.disabled}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={[styles.outStock, { color: colors.error }]}>
                  Out of Stock
                </Text>
              )}
            </View>
            <View style={styles.group}>
              <Text style={[styles.title, { flex: 1 }]}>฿{item.total}</Text>
              <TouchableOpacity onPress={() => deleteCart(item.id)}>
                <MaterialCommunityIcons
                  name="delete-circle-outline"
                  size={35}
                  color={colors.error}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default withTheme(CartBox);

const styles = StyleSheet.create({
  cartBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#fff",

    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  cartImg: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inp: {
    backgroundColor: "#e9ecef",
    fontSize: 20,
    minWidth: 60,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    textAlign: "center",
    padding: 5,
    marginHorizontal: 5,
  },
  group: { flexDirection: "row", paddingVertical: 5, alignItems: "center" },
  outStock: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import Axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { TextInput, Button } from "react-native-paper";
import { gbStyles } from "../styles";
import API from "../constants/API";
import MainLayout from "../layouts/MainLayout";
import ImageUpload from "../components/ImageUpload";

export default class CreateProductScreen extends Component {
  state = {
    image: null,
    name: "",
    price: "",
    stock: "",
    loading: false,
  };

  handleSubmit = () => {
    const { name, price, stock, image } = this.state;
    this.setState({ loading: true });
    Axios.post(API.PRODUCT_CREATE, {
      nama: name,
      harga: price,
      stock: stock,
      photoUrl: image,
    })
      .then((res) => {
        this.setState(
          { loading: false, image: null, name: "", price: "", stock: "" },
          () => this.props.navigation.navigate("Home")
        );
      })
      .catch((err) => {
        if (err.response) alert(err.response.data);
        this.setState({ loading: false });
      });
  };

  render() {
    const { image, name, price, stock, loading } = this.state;
    const { navigation } = this.props;
    return (
      <MainLayout navigation={navigation} dark>
        <View style={gbStyles.container}>
          <ImageUpload
            image={image}
            onUpload={(res) => this.setState({ image: res })}
          />
          <View style={{ width: "100%" }}>
            <TextInput
              label="Product Name"
              value={name}
              onChangeText={(text) => this.setState({ name: text })}
              mode="outlined"
              style={{ marginTop: 10 }}
            />
            <TextInput
              label="Product Prices"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={(text) => {
                if (!isNaN(text)) this.setState({ price: text });
              }}
              mode="outlined"
              style={{ marginTop: 10 }}
            />
            <TextInput
              label="Product Stocks"
              keyboardType="decimal-pad"
              value={stock}
              onChangeText={(text) => {
                if (!isNaN(text))
                  this.setState({ stock: Number(text).toString() });
              }}
              mode="outlined"
              style={{ marginTop: 10 }}
            />
            <Button
              mode="contained"
              onPress={() => this.handleSubmit()}
              style={{ marginTop: 15 }}
              disabled={!(image && name && price && stock) || loading}
              loading={loading}
            >
              Create Product
            </Button>
          </View>
        </View>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  imageBox: {
    width: 250,
    height: 250,
    borderRadius: 1000,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 20,
    borderColor: "#6200ee",
  },
});

import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import TopBarLayout from "../layouts/TopBarLayout";
import ImageUpload from "../components/ImageUpload";
import { TextInput, Button } from "react-native-paper";
import Axios from "axios";
import API from "../constants/API";

export default class CreateProductScreen extends Component {
  state = {
    image: null,
    name: "",
    price: "",
    stock: "",
    loading: false,
  };

  handleSubmit = () => {
    let { name, price, stock, image } = this.state;
    let data = {
      nama: name,
      harga: price,
      stock: stock,
      photoUrl: image,
    };
    this.setState({ loading: true });
    Axios.post(API.PRODUCT_CREATE, data)
      .then(() => {
        this.setState({
          loading: false,
          image: null,
          name: "",
          price: "",
          stock: "",
        });
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.response) alert(error.response.data);
        this.setState({ loading: false });
      });
  };

  render() {
    let { name, price, stock, image, loading } = this.state;
    return (
      <TopBarLayout navigation={this.props.navigation} title="Create Product">
        <ImageUpload
          image={image}
          onUpload={(res) => this.setState({ image: res })}
          navigation={this.props.navigation}
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
            label="Product Price"
            value={price}
            onChangeText={(text) => {
              if (!isNaN(text))
                this.setState({ price: Number(text).toString() });
            }}
            mode="outlined"
            style={{ marginTop: 10 }}
          />
          <TextInput
            label="Product Stock"
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
            style={{ marginTop: 15 }}
            onPress={() => this.handleSubmit()}
            disabled={
              !(image && name && Number(price) > 0 && Number(stock) > 0)
            }
            loading={loading}
          >
            Create Product
          </Button>
        </View>
      </TopBarLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    paddingHorizontal: 10,
  },
});

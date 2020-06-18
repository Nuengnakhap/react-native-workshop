import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MainLayout from "../layouts/MainLayout";
import { SafeAreaView } from "react-native-safe-area-context";
import { gbStyles } from "../styles";
import { TextInput, Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import Axios from "axios";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import API from "../constants/API";
import ImageUpload from "../components/ImageUpload";

export default class RegisterScreen extends Component {
  state = {
    user: { email: "", password: "", nama: "", photoUrl: "" },
    confirmPass: "",
    loading: false,
  };

  handleSubmit = () => {
    const { user } = this.state;
    this.setState({ loading: true });
    Axios.post(API.USER_REGISTER, user)
      .then((res) => {
        this.props.setLogin(res.data.token);
        this.setState({ loading: false }, () =>
          this.props.navigation.navigate("Home")
        );
      })
      .catch((err) => {
        if (err.response) alert(err.response.data.errorMsg);
        this.setState({ loading: false });
      });
  };

  handleChangeText = (name) => (value) => {
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      user: { email, password, photoUrl, nama },
      loading,
      confirmPass,
    } = this.state;
    const checkPass = password == confirmPass;
    return (
      <MainLayout navigation={navigation} dark disCart>
        <SafeAreaView>
          <View style={gbStyles.container}>
            <ImageUpload
              image={photoUrl}
              onUpload={this.handleChangeText("photoUrl")}
              style={{ marginBottom: 10 }}
            />
            <View style={{ width: "100%" }}>
              <TextInput
                label="Name"
                mode="outlined"
                style={gbStyles.input}
                value={nama}
                onChangeText={this.handleChangeText("nama")}
              />
              <TextInput
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                style={gbStyles.input}
                value={email}
                onChangeText={this.handleChangeText("email")}
              />
              <TextInput
                label="Password"
                mode="outlined"
                style={gbStyles.input}
                value={password}
                onChangeText={this.handleChangeText("password")}
                secureTextEntry
              />
              <TextInput
                label="Confirm Password"
                mode="outlined"
                style={gbStyles.input}
                value={confirmPass}
                onChangeText={(txt) => this.setState({ confirmPass: txt })}
                secureTextEntry
                error={!checkPass}
              />
              <Button
                icon="key"
                mode="contained"
                onPress={this.handleSubmit}
                style={{ marginTop: 5 }}
                disabled={
                  !(email && password && photoUrl && nama && checkPass) ||
                  loading
                }
                loading={loading}
              >
                Register
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({
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

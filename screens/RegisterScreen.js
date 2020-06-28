import React, { Component } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import ImageUpload from "../components/ImageUpload";
import Axios from "axios";
import API from "../constants/API";
import TopBarLayout from "../layouts/TopBarLayout";

export default class RegisterScreen extends Component {
  state = {
    email: null,
    password: null,
    confirmPassword: null,
    nama: "",
    photoUrl: null,
  };

  handleSubmit = () => {
    const { email, password, nama, photoUrl } = this.state;
    let user = { email, password, nama, photoUrl };
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

  render() {
    let { email, password, photoUrl, nama } = this.state;
    let checkPass = this.state.password != this.state.confirmPassword;
    return (
      <TopBarLayout navigation={this.props.navigation} title="Register">
        <ImageUpload
          image={this.state.photoUrl}
          onUpload={(res) => this.setState({ photoUrl: res })}
          style={{ marginBottom: 10 }}
          navigation={this.props.navigation}
        />
        <TextInput
          label="Name"
          value={this.state.nama}
          style={{ width: "100%" }}
          onChangeText={(text) => this.setState({ nama: text })}
        />
        <TextInput
          label="Email"
          value={this.state.email}
          style={{ width: "100%", marginTop: 10 }}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          label="Password"
          value={this.state.password}
          style={{ width: "100%", marginTop: 10 }}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry
        />
        <TextInput
          label="Confirm Password"
          value={this.state.confirmPassword}
          style={{ width: "100%", marginTop: 10 }}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          secureTextEntry
          error={this.state.confirmPassword ? checkPass : false}
        />
        <Button
          mode="contained"
          onPress={() => this.handleSubmit()}
          style={{ marginTop: 10 }}
          disabled={!(email && password && photoUrl && nama && !checkPass)}
        >
          Register
        </Button>
      </TopBarLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: 20,
  },
});

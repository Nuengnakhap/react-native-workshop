import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import API from "../constants/API";
import Axios from "axios";
import TopBarLayout from "../layouts/TopBarLayout";

export default class LoginScreen extends Component {
  state = {
    email: null,
    password: null,
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    Axios.post(API.USER_LOGIN, {
      email,
      password,
    })
      .then((res) => {
        this.setState({ loading: false }, () => {
          this.props.setLogin(res.data.token);
          this.props.navigation.navigate("Home");
        });
      })
      .catch((err) => {
        if (err.response) alert(err.response.data.errorMsg);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <TopBarLayout navigation={this.props.navigation} title="Login">
        <Image
          source={{
            uri:
              "https://pronto-core-cdn.prontomarketing.com/2/wp-content/uploads/sites/2826/2018/12/1_6kK9j74vyOmXYm1gN6ARhQ.png",
          }}
          style={{ width: 200, height: 200, resizeMode: "cover" }}
        />
        <TextInput
          label="Email"
          value={this.state.email}
          style={{ width: "100%" }}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          label="Password"
          value={this.state.password}
          style={{ width: "100%", marginTop: 10 }}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button
          mode="contained"
          onPress={() => this.handleSubmit()}
          style={{ marginTop: 10 }}
        >
          Login
        </Button>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <Text style={styles.text}>Don't have an Account?</Text>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => this.props.navigation.push("Register")}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      </TopBarLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
  },
});

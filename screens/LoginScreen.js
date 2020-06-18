import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gbStyles } from "../styles";
import { TextInput, Button, withTheme } from "react-native-paper";
import Axios from "axios";
import API from "../constants/API";
import { connect } from "react-redux";
import { Actions } from "../redux/actions";
import { compose } from "redux";
import MainLayout from "../layouts/MainLayout";

class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };
  handleSubmit = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    Axios.post(API.USER_LOGIN, {
      email,
      password,
    })
      .then((res) => {
        this.setState({ loading: false }, () =>
          this.props.setLogin(res.data.token)
        );
      })
      .catch((err) => {
        if (err.response) alert(err.response.data.errorMsg);
        this.setState({ loading: false });
      });
  };

  render() {
    const { email, password, loading } = this.state;
    const { navigation, user } = this.props;
    return (
      <SafeAreaView>
        <MainLayout navigation={navigation} dark disCart>
          <View style={gbStyles.container}>
            <Image
              source={{
                uri:
                  "https://download.seaicons.com/icons/paomedia/small-n-flat/1024/shop-icon.png",
              }}
              style={gbStyles.logo}
            />
            <View style={{ width: "100%" }}>
              <TextInput
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                style={gbStyles.input}
                value={email}
                onChangeText={(txt) => this.setState({ email: txt })}
              />
              <TextInput
                label="Password"
                mode="outlined"
                style={gbStyles.input}
                value={password}
                onChangeText={(txt) => this.setState({ password: txt })}
                secureTextEntry
              />
              <Button
                icon="key"
                mode="contained"
                onPress={this.handleSubmit}
                style={{ marginTop: 5 }}
                disabled={!(email && password)}
                loading={loading}
              >
                Login
              </Button>
            </View>
          </View>
        </MainLayout>
      </SafeAreaView>
    );
  }
}

export default compose(
  connect((store) => ({ user: store.user }), { ...Actions }),
  withTheme
)(LoginScreen);

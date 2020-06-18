import { createStackNavigator } from "@react-navigation/stack";
import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import MainNavigation from "./navigation/MainNavigation";
import { Actions } from "./redux/actions";
import PrivateHoc from "./hocs/PrivateHoc";
import CartScreen from "./screens/CartScreen";
import { Appbar } from "react-native-paper";

const Stack = createStackNavigator();

class Auth extends Component {
  componentDidMount() {
    const {
      user: { token },
    } = this.props;
    if (token) Axios.defaults.headers = { authorization: `Bearer ${token}` };
  }

  render() {
    const {
      user: { isLogin },
    } = this.props;
    // return <View></View>;
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Root"
          component={MainNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={PrivateHoc(CartScreen)}
          options={{
            header: ({ scene, previous, navigation }) => {
              const { options } = scene.descriptor;
              const title =
                options.headerTitle !== undefined
                  ? options.headerTitle
                  : options.title !== undefined
                  ? options.title
                  : scene.route.name;

              return (
                <Appbar.Header>
                  {previous && (
                    <Appbar.BackAction onPress={navigation.goBack} />
                  )}
                  <Appbar.Content title={title} />
                </Appbar.Header>
              );
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default connect((store) => ({ user: store.user }), { ...Actions })(Auth);

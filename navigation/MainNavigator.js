import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { Drawer as PaperDrawer } from "react-native-paper";
import { TouchableOpacity, AsyncStorage } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUserPlus,
  faKey,
  faHome,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import Cart from "../components/Cart";
import PrivateHoc from "../hooks/PrivateHoc";
import { persistor, store } from "../redux";
import { connect } from "react-redux";
import actions from "../redux/actions";
import { purgeStoredState } from "redux-persist";
import CreateProductScreen from "../screens/CreateProductScreen";
import CameraScreen from "../screens/CameraScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { descriptors, state, navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      {state.routes.map((item, index) => {
        let active = props.state.index == index;
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => navigation.navigate(item.name)}
          >
            <PaperDrawer.Item
              style={{ backgroundColor: active ? "#ede0fc" : "#fff" }}
              icon={getIcon(item.name)}
              label={descriptors[item.key].options.title || item.name}
              active={active}
            />
          </TouchableOpacity>
        );
      })}
      {props.isLogin && (
        <>
          <TouchableOpacity onPress={() => props.logout()}>
            <PaperDrawer.Item
              style={{ backgroundColor: "red" }}
              icon={getIcon("Logout")}
              label={"Logout"}
              theme={{
                colors: { text: "#fff" },
              }}
              // active={active}
            />
          </TouchableOpacity>
        </>
      )}
    </DrawerContentScrollView>
  );
};

const getIcon = (name) => {
  switch (name) {
    case "Home":
      return ({ size, color }) => (
        <FontAwesomeIcon icon={faHome} size={size} color={color} />
      );
    case "CreateProduct":
      return "pencil";
    case "Login":
      return ({ size, color }) => (
        <FontAwesomeIcon icon={faKey} size={size} color={color} />
      );
    case "Logout":
      return "exit-to-app";
    case "Register":
      return ({ size, color }) => (
        <FontAwesomeIcon icon={faUserPlus} size={size} color={color} />
      );
    case "Cart":
      return ({ size, color }) => (
        <FontAwesomeIcon icon={faShoppingCart} size={size} color={color} />
      );
  }
};

const MainNavigator = ({ navigation, user, ...props }) => {
  let mainProps = props;
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            isLogin={user.isLogin}
            logout={() => mainProps.setLogout()}
          />
        )}
      >
        <Drawer.Screen name="Home" component={PrivateHoc(HomeScreen)} />

        {user.isLogin ? (
          <>
            <Drawer.Screen name="Cart" component={PrivateHoc(CartScreen)} />
            <Drawer.Screen
              name="CreateProduct"
              component={PrivateHoc(CreateProductScreen)}
              options={{ title: "Create Product" }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={PrivateHoc(LoginScreen)} />
            <Drawer.Screen
              name="Register"
              component={PrivateHoc(RegisterScreen)}
            />
          </>
        )}
      </Drawer.Navigator>
      {user.isLogin && <Cart navigation={navigation} />}
    </>
  );
};

export default connect(
  (store) => ({ user: store.user }),
  actions
)(MainNavigator);

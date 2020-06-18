import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React from "react";
import { Drawer as PaperDrawer, withTheme } from "react-native-paper";
import CreateProductScreen from "../screens/CreateProductScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Actions } from "../redux/actions";
import { compose } from "redux";
import PrivateHoc from "../hocs/PrivateHoc";
import RegisterScreen from "../screens/RegisterScreen";
import Cart from "../components/Cart";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { descriptors, state, navigation, isLogin, theme, setLogout } = props;

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
              label={descriptors[item.key].options.title}
              active={active}
            />
          </TouchableOpacity>
        );
      })}
      {isLogin && (
        <TouchableOpacity onPress={() => setLogout()}>
          <PaperDrawer.Item
            style={{ backgroundColor: theme.colors.error }}
            icon={getIcon("Logout")}
            label="Logout"
            theme={{
              ...theme,
              colors: {
                text: "#fff",
              },
            }}
            // active={active}
          />
        </TouchableOpacity>
      )}
    </DrawerContentScrollView>
  );
}

const getIcon = (name) => {
  switch (name) {
    case "Home":
      return "home";
    case "CreateProduct":
      return "pencil";
    case "Login":
      return "key";
    case "Logout":
      return "exit-to-app";
    case "Register":
      return ({ size, color }) => (
        <FontAwesome5 name="user-plus" size={size} color={color} />
      );
  }
};

const MainNavigation = ({
  navigation,
  route,
  user: { isLogin },
  cart: { cart },
  theme,
  ...props
}) => {
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
  });
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Home"
        // drawerContentOptions={{
        //   activeBackgroundColor: "#ede0fc",
        //   activeTintColor: "#6200ee",
        // }}
        drawerContent={(propsContent) => (
          <CustomDrawerContent
            {...propsContent}
            {...props}
            isLogin={isLogin}
            theme={theme}
          />
        )}
      >
        <Drawer.Screen
          name="Home"
          component={PrivateHoc(HomeScreen)}
          options={{ title: "Home" }}
        />
        {isLogin ? (
          <Drawer.Screen
            name="CreateProduct"
            options={{ title: "Create Product" }}
            children={(nav) => <CreateProductScreen {...nav} />}
          />
        ) : (
          <>
            <Drawer.Screen
              name="Login"
              options={{ title: "Login" }}
              children={(nav) => <LoginScreen {...nav} />}
            />
            <Drawer.Screen
              name="Register"
              options={{ title: "Register" }}
              component={PrivateHoc(RegisterScreen)}
              // children={(nav) => <RegisterScreen {...nav} />}
            />
          </>
        )}
      </Drawer.Navigator>
      {showCart(route) && <Cart navigation={navigation} cart={cart} />}
    </>
  );
};

const showCart = (route) => {
  let currentRoute = route.state?.routes[route.state.index]?.name ?? null;
  switch (currentRoute) {
    case "CreateProduct":
      return false;
    default:
      return true;
  }
};

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? "Home";

  switch (routeName) {
    case "Home":
      return "How to get started";
    case "Links":
      return "Links to learn more";
  }
}

export default compose(
  connect((store) => ({ user: store.user, cart: store.cart }), { ...Actions }),
  withTheme
)(MainNavigation);

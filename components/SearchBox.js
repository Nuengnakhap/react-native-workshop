import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBox = () => {
  const [search, setSearch] = React.useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inp}
        placeholder="Search Products"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <TouchableOpacity style={styles.button}>
        <View style={styles.icon}>
          <Ionicons name="ios-search" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 5,
    flexDirection: "row",
    overflow: "hidden",
  },
  inp: {
    fontSize: 20,
    padding: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "#000",
    height: "100%",
    width: 50,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

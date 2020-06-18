import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Axios from "axios";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import API from "../constants/API";

const ImageUpload = ({ image, onUpload = () => {}, style = {} }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      Axios.post(
        API.UPLOAD_IMAGE,
        { image: result.base64 },
        {
          headers: {
            Authorization: "Client-ID 3367d62d26cbb31",
          },
        }
      )
        .then((res) => {
          onUpload(res.data.data.link);
        })
        .catch((err) => alert("IMGUR ERROR " + err));
    }
  };

  React.useEffect(() => {
    const checkPermission = async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    return () => {
      checkPermission;
    };
  }, []);

  return (
    <TouchableOpacity style={[styles.imageBox, style]} onPress={pickImage}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      ) : (
        <Entypo name="camera" size={80} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default ImageUpload;

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

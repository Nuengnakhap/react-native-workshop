import {
  faCamera,
  faImage,
  faImages,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Axios from "axios";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import API from "../constants/API";
import { connectActionSheet } from "@expo/react-native-action-sheet";

const ImageUpload = ({
  image,
  onUpload = () => {},
  style = {},
  navigation,
  ...props
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      uploadImage(result.base64);
    }
  };

  const uploadImage = (base64) => {
    Axios.post(
      API.UPLOAD_IMAGE,
      { image: base64 },
      {
        headers: {
          Authorization: "Client-ID 3367d62d26cbb31",
        },
      }
    )
      .then((res) => {
        // console.log(res.data);
        onUpload(res.data.data.link);
      })
      .catch((err) => alert("IMGUR ERROR " + err));
  };

  const _onOpenActionSheet = () => {
    const options = ["Photo picker", "Camera", "Cancel"];
    const icons = [
      <FontAwesomeIcon icon={faCamera} />,
      <FontAwesomeIcon icon={faImages} />,
      <FontAwesomeIcon icon={faTimesCircle} />,
    ];
    const cancelButtonIndex = 2;

    props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        icons,
      },
      (buttonIndex) => {
        // Do something here depending on the button index selected
        switch (buttonIndex) {
          case 0:
            pickImage();
            break;
          case 1:
            navigation.navigate("Camera", { image: (res) => uploadImage(res) });
            break;
          default:
            break;
        }
      }
    );
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
    <TouchableOpacity
      style={[styles.imageBox, style]}
      onPress={_onOpenActionSheet}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        />
      ) : (
        <FontAwesomeIcon icon={faCamera} size={80} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default connectActionSheet(ImageUpload);

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

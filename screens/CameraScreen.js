import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: false,
      type: Camera.Constants.Type.back,
    };
    this.cameraRef = null;
  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ permission: status === "granted" });
  }

  render() {
    const { permission, type } = this.state;
    if (!permission) {
      return (
        <View>
          <Text>Not have permission!</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(ref) => {
            this.cameraRef = ref;
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 30, left: 30 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <FontAwesomeIcon icon={faTimes} color="#fff" size={30} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
              }}
              onPress={() => {
                this.setState({
                  type:
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={async () => {
                if (this.cameraRef) {
                  let photo = await this.cameraRef.takePictureAsync({
                    quality: 1,
                    base64: true,
                  });
                  this.props.route.params?.image(photo.base64);
                  this.props.navigation.goBack();
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 1000,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 1000,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const ProductItem = ({
  title,
  imageUrl,
  owner,
  seller,
  price,
  setCart = () => {},
  cannotBuy,
}) => {
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
      }}
    >
      <View style={styles.productBox}>
        <Image source={{ uri: imageUrl }} style={styles.productImg} />
        <Text style={styles.productTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.productAction}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16 }} numberOfLines={1}>
              {seller}
            </Text>
            <Text style={{ fontSize: 16 }} numberOfLines={1}>
              ฿{price}
            </Text>
          </View>
          {!owner && (
            <View style={{ justifyContent: "center" }}>
              <Button
                // icon="camera"
                mode="contained"
                onPress={setCart}
                disabled={cannotBuy}
              >
                Buy
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  productImg: {
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  productTitle: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  productAction: {
    padding: 5,
    flexDirection: "row",
  },
});

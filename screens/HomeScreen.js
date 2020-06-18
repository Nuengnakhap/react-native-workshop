import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView, SafeAreaConsumer } from "react-native-safe-area-context";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import SearchBox from "../components/SearchBox";
import MainLayout from "../layouts/MainLayout";
import ProductItem from "../components/ProductItem";
import Axios from "axios";
import API from "../constants/API";

export default class HomeScreen extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.product.products.length !== this.props.product.products.length
    );
  }

  componentDidMount() {
    this.props.getProduct();
  }

  renderItem = ({ item, index }) => {
    const {
      user: { profile },
      setCart,
      cart: { cart },
    } = this.props;

    let owner = profile ? item.seller.id == profile.id : true;
    let cannotBuy = (cart[item.id]?.item ?? 0) >= item.stock;
    return (
      <ProductItem
        key={index}
        title={item.nama}
        imageUrl={item.photoUrl}
        seller={item.seller.nama}
        owner={owner}
        price={item.harga}
        setCart={() =>
          setCart({
            id: item.id,
            item: 1,
            total: Number(item.harga),
            outOfStock: false,
          })
        }
        cannotBuy={cannotBuy}
      />
    );
  };

  render() {
    const {
      navigation,
      user: { profile },
      setCart,
      cart: { cart },
      product: { products },
    } = this.props;
    return (
      <MainLayout navigation={navigation}>
        <FlatList
          data={products}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.textIntro}>E-COMMERCE</Text>
              <SearchBox />
            </View>
          }
          numColumns={2}
          extraData={cart}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.id}
          style={{ backgroundColor: "#fff" }}
        />
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({
  listHeader: {
    backgroundColor: "#6200ee",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  textIntro: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

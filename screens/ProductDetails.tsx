import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetails"
>;
type ProductDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductDetails"
>;

type Props = {
  route: ProductDetailsScreenRouteProp;
  navigation: ProductDetailsScreenNavigationProp;
};

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    width: "100%",
  },
  containerImage: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    padding: 16,
    alignSelf: "center",
  },
  title: {
    paddingTop: 16,
    width: "100%",
    fontSize: 24,
    textAlign: "left",
    marginBottom: 16,
  },
  price: {
    width: "100%",
    fontSize: 18,
    textAlign: "left",
    marginBottom: 16,
  },
  description: {
    textAlign: "left",
    width: "100%",

    fontSize: 16,

    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProductDetailsScreen;

import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { truncateTitle } from "../utils/utils";
import { Product } from "../types/Product";

const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  //@ts-ignore
  const { cart, addToCart, removeFromCart, removeItemFromCart } =
    useContext(CartContext);

  const uniqueProducts = cart.reduce((unique: Product[], item: Product) => {
    const existingIndex = unique.findIndex((p) => p.id === item.id);
    if (existingIndex !== -1) {
      unique[existingIndex].quantity =
        (unique[existingIndex].quantity || 0) + 1;
    } else {
      unique.push({ ...item, quantity: 1 });
    }
    return unique;
  }, []);

  // Calculate total price
  const totalPrice = uniqueProducts.reduce((total: any, item: any) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  const renderItem = (item: Product) => {
    const itemQty = cart.filter(
      (cartItem: any) => cartItem.id === item.id
    ).length;

    return (
      <View style={styles.productContainer}>
        <View style={{ flexDirection: "row", width: "100%", margin: 20 }}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.title}>{truncateTitle(item.title, 20)}</Text>
            <Text style={styles.description}>
              {truncateTitle(item.description, 50)}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <TouchableOpacity onPress={() => removeItemFromCart(item)}>
            <Text style={styles.deleteButton}>Supprimer</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Text style={styles.actionButton}>+</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{itemQty}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item)}>
              <Text style={styles.actionButton}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (uniqueProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Votre panier est vide</Text>
        <Text style={styles.emptySubText}>
          Parcourez nos catégories et découvrez nos meilleures offres
        </Text>
        <TouchableOpacity
          style={styles.navigateButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.navigateButtonText}>Parcourez vos achats</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={uniqueProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
      <View style={styles.orderButtonContainer}>
        {uniqueProducts.length > 0 && (
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() =>
              navigation.navigate("Order", { totalPrice: totalPrice })
            }
          >
            <Text style={styles.orderButtonText}>
              Commander (${totalPrice.toFixed(2)})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
  },
  productContainer: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    alignSelf: "center",
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    textAlign: "left",
  },
  actionButton: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#1E90FF",
    width: 70,
    textAlign: "center",
  },
  description: {
    margin: 10,
    width: "60%",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  deleteButton: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "red",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
    textAlign: "left",
  },
  orderButtonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  orderButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  navigateButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  navigateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;

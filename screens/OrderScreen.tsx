// OrderScreen.tsx

import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CartContext } from "../context/CartContext";
import { Product } from "../types/Product";
import { truncateTitle } from "../utils/utils";

const OrderScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  //@ts-ignore
  const { cart, clearCart } = useContext(CartContext);
  const totalPrice = route.params?.totalPrice || 0;

  const groupProducts = (cart: Product[]) => {
    const groupedProducts: { [key: string]: Product } = {};
    cart.forEach((product) => {
      if (groupedProducts[product.id]) {
        groupedProducts[product.id].quantity += 1;
      } else {
        groupedProducts[product.id] = { ...product, quantity: 1 };
      }
    });
    return Object.values(groupedProducts);
  };

  const renderOrderSummary = () => {
    const groupedProducts = groupProducts(cart);

    return (
      <View style={styles.orderSummaryContainer}>
        <Text style={styles.orderSummaryText}>Résumé de la Commande:</Text>
        {groupedProducts.map((product: Product) => (
          <View key={product.id} style={styles.productSummary}>
            <Text>
              {truncateTitle(product.title, 20)} (x{product.quantity})
            </Text>
            <Text>${product.price}</Text>
          </View>
        ))}
        <Text style={styles.totalPrice}>
          Prix Total: ${totalPrice.toFixed(2)}
        </Text>
      </View>
    );
  };

  const confirmOrder = () => {
    Alert.alert(
      "Commande confirmée",
      "Votre commande a été passée avec succès!",
      [
        {
          text: "OK",
          onPress: () => {},
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {renderOrderSummary()}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
        <Text style={styles.confirmButtonText}>Confirmer la Commande</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  orderSummaryContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginBottom: 20,
  },
  orderSummaryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalPrice: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  confirmButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderScreen;

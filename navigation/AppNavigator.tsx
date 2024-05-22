import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider, CartContext } from "../context/CartContext";
import CartScreen from "../screens/CartScreen";
import { RootStackParamList } from "../types/navigation";
import ProductDetails from "../screens/ProductDetails";
import OrderScreen from "../screens/OrderScreen";
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <CartProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
          },
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: "",
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={({ navigation }) => ({
            headerTitle: "",

            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  style={{ padding: 10 }}
                  size={29}
                  color="black"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={({ navigation }) => ({
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  style={{ padding: 10 }}
                  size={29}
                  color="black"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={({ navigation }) => ({
            headerTitle: "Passage de la Commande",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  style={{ padding: 10 }}
                  size={29}
                  color="black"
                />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </CartProvider>
  );
};

const CartIcon: React.FC<{ navigation: any }> = ({ navigation }) => {
  const cartContext = useContext(CartContext);
  const cartItemCount = cartContext?.getCartItemCount() || 0;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
      <View style={styles.cartIconContainer}>
        <Ionicons
          name="cart-outline"
          style={{ paddingLeft: 25 }}
          size={29}
          color="black"
        />
        {cartItemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    padding: 10,
  },
  badge: {
    position: "absolute",
    right: 2,
    top: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
});

export { AppNavigator };

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { getProducts } from "../services/productService";
import { Product } from "../types/Product";
import { generateCustomKey, truncateTitle } from "../utils/utils";
import { CartContext } from "../context/CartContext";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { v4 as uuidv4 } from "uuid";
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [itemQty, setItemQty] = useState<number>(0);
  const cartContext = useContext(CartContext);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleAddToCart = (product: Product) => {
    cartContext?.addToCart(product);
    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const handleIncrement = (product: Product) => {
    cartContext?.addToCart(product);
    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const handleDecrement = (product: Product) => {
    if (quantities[product.id] > 1) {
      cartContext?.removeFromCart(product);
      setQuantities((prev) => ({
        ...prev,
        [product.id]: prev[product.id] - 1,
      }));
    } else {
      cartContext?.removeFromCart(product);
      const { [product.id]: _, ...rest } = quantities;
      setQuantities(rest);
    }
  };

  useEffect(() => {
    fetchProducts();
    updateQuantitiesFromCart();
  }, []);

  useEffect(() => {
    updateQuantitiesFromCart();
  }, [cartContext?.cart]);

  const updateQuantitiesFromCart = () => {
    const updatedQuantities: { [key: string]: number } = {};
    cartContext?.cart.forEach((item: Product) => {
      updatedQuantities[item.id] = (updatedQuantities[item.id] || 0) + 1;
    });
    setQuantities(updatedQuantities);
  };
  const fetchProducts = async () => {
    try {
      setLoading(true);
      //@ts-ignore
      const data = await getProducts(currentPage);
      setProducts((prevProducts) => [...prevProducts, ...data]);
      setCurrentPage((prevPage) => prevPage + 1);
      setHasMore(data.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    setCurrentPage(1);
    setProducts([]);
    await fetchProducts();
    setRefreshing(false);
  };
  const handleEndReached = () => {
    if (hasMore) {
      fetchProducts();
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => generateCustomKey()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetails", { product: item })
              }
            >
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>

            <Text style={styles.title}>{truncateTitle(item.title, 20)}</Text>
            <Text style={styles.price}>${item.price}</Text>
            {quantities[item.id] ? (
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecrement(item)}>
                  <Text style={styles.actionButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantities[item.id]}</Text>
                <TouchableOpacity onPress={() => handleIncrement(item)}>
                  <Text style={styles.actionButton}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.buttonText}>Commander</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    marginBottom: 16,
    alignItems: "center",
    width: 180,
    marginTop: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    padding: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#1E90FF",
  },
  buttonText: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 6,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 6,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#1E90FF",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
});

export default HomeScreen;

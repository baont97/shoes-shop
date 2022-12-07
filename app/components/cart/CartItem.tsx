import React from "react";
import {
  Alert,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CartProduct, editCart, removeFromCart } from "../../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/ultis";
import { color } from "../../theme/color";
import { spacing } from "../../theme/spacing";
import { presetStyle } from "../../theme/style";

const $root: ViewStyle = {
  ...presetStyle.rowCenter,
  borderRadius: spacing.medium,
  backgroundColor: color.white,
  marginHorizontal: spacing.medium,
  marginTop: spacing.medium,
  padding: spacing.medium,
};

const $content: ViewStyle = {
  ...presetStyle.container,
  paddingLeft: spacing.medium,
};

const $image: ImageStyle = {
  width: 80,
  height: 80,
  borderRadius: spacing.medium,
};

const $productNameText: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
};

const $priceText: TextStyle = {
  fontSize: 12,
  fontWeight: "600",
  marginVertical: spacing.small,
};

const $quantityText: TextStyle = {
  fontSize: 16,
  marginHorizontal: spacing.small,
};

const $quantityButton: ViewStyle = {
  width: 16,
  height: 16,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  backgroundColor: color.primary,
};

const $removeCartText: TextStyle = {
  fontSize: 12,
  fontWeight: "600",
  marginVertical: spacing.small,
  color: color.error,
};

const $paidStyle: TextStyle = {
  color: color.primary,
};

const $paidContainer: ViewStyle = {
  transform: [{ rotate: "-15deg" }],
  borderWidth: StyleSheet.hairlineWidth,
  aspectRatio: 1,
  borderRadius: 9999,
  padding: spacing.small,
  alignItems: "center",
  justifyContent: "center",
  borderColor: color.primary,
};

type CartItemProps = {
  cart: CartProduct;
};

const CartItem = ({ cart }: CartItemProps) => {
  const dispatch = useAppDispatch();
  const sizeList = useAppSelector((state) => state.product.sizeList);

  const sizeName = sizeList.find((x) => x.id === cart.sizeId)?.name;

  const handleChangeQuantity = (isIncrease: boolean) => () => {
    dispatch(
      editCart({
        ...cart,
        quantity: cart.quantity + (isIncrease ? 1 : -1),
      })
    );
  };

  const handleRemoveCart = () => {
    Alert.alert("Xóa", "Bạn có chắc muốn xóa sản phẩm này?", [
      {
        text: "Xóa",
        onPress: () => dispatch(removeFromCart(cart)),
        style: "destructive",
      },
      {
        text: "Không",
      },
    ]);
  };

  return (
    <View style={$root}>
      <Image style={$image} source={{ uri: cart.image }} />
      <View style={$content}>
        <Text style={$productNameText}>{cart.name}</Text>
        <Text style={$priceText}>
          {cart.price.toLocaleString()} VNĐ - Kích cỡ: {sizeName}
        </Text>
        {cart.isPaid ? null : (
          <View style={presetStyle.rowCenter}>
            <TouchableOpacity
              style={[$quantityButton, { backgroundColor: "transparent" }]}
              onPress={handleChangeQuantity(false)}
              disabled={cart.quantity === 1}
            >
              <Text style={{ fontSize: 10 }}>-</Text>
            </TouchableOpacity>
            <Text style={$quantityText}>{cart.quantity}</Text>
            <TouchableOpacity
              style={$quantityButton}
              onPress={handleChangeQuantity(true)}
            >
              <Text style={{ fontSize: 10, color: color.white }}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {cart.isPaid ? (
        <View style={$paidContainer}>
          <Text style={$paidStyle}>Paid</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleRemoveCart}>
          <Text style={$removeCartText}>Xóa</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CartItem;

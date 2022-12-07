import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CartItem } from "../components/cart";
import { paidAll } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/ultis";
import { color } from "../theme/color";
import { spacing } from "../theme/spacing";
import { presetStyle } from "../theme/style";

const $emptyBox: ViewStyle = {
  padding: spacing.large,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

const $emptyText: TextStyle = {
  color: color.gray,
  fontSize: 12,
};

const $buyButton: ViewStyle = {
  paddingHorizontal: spacing.medium,
  margin: spacing.medium,
  ...presetStyle.button,
};

const $totalText: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
  margin: spacing.medium,
};

const $footer: ViewStyle = {};

const CartScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const cartList = useAppSelector((state) => state.cart.cartList);

  const total = (cartList || []).reduce((acc, cur) => {
    if (!cur.isPaid) {
      return (acc += cur.price);
    } else {
      return acc;
    }
  }, 0);

  const handleCheckout = () => {
    Alert.alert("Thanh toán", "Bạn muốn thanh toán đơn hàng này?", [
      {
        text: "Hủy",
        style: "destructive",
      },
      {
        text: "Thanh toán",
        onPress: () => {
          dispatch(paidAll());
          Alert.alert(
            "Thành công",
            "Thanh toán thành công, cảm ơn bạn đã mua hàng"
          );
        },
      },
    ]);
  };

  return (
    <View style={presetStyle.container}>
      {!cartList?.length ? (
        <View style={$emptyBox}>
          <Text style={$emptyText}>
            Bạn không có sản phẩm nào, mua sắm ngay thôi
          </Text>

          <TouchableOpacity
            style={$buyButton}
            onPress={() =>
              navigation.navigate(
                "AppBottomTab" as never,
                { screen: "Home" } as never
              )
            }
          >
            <Text style={presetStyle.buttonText}>Mua sắm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView>
            {cartList.map((x, i) => (
              <CartItem cart={x} key={i} />
            ))}
          </ScrollView>
          {cartList.some((x) => !x.isPaid) ? (
            <View style={[$footer, { marginBottom: insets.bottom }]}>
              <Text style={$totalText}>
                Tổng cộng: {total.toLocaleString()} VNĐ
              </Text>
              <TouchableOpacity
                style={presetStyle.button}
                onPress={handleCheckout}
              >
                <Text style={presetStyle.buttonText}>Thanh toán</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

export default CartScreen;

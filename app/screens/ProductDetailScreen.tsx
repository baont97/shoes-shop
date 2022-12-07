import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useLayoutEffect, useState } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addToCart } from "../redux/cartSlice";
import { Product, Size } from "../redux/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/ultis";
import { color } from "../theme/color";
import { spacing } from "../theme/spacing";
import { presetStyle } from "../theme/style";

const $imageWith = spacing.width;

const $productImage: ImageStyle = {
  width: $imageWith,
  height: $imageWith * 0.8,
};

const $content: ViewStyle = {
  padding: spacing.medium,
  flex: 1,
};

const $priceText: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
  marginVertical: spacing.small,
};

const $colorText: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
  marginVertical: spacing.small,
};

const $descText: TextStyle = {
  fontSize: 14,
  color: color.gray,
};

const $sizeText: TextStyle = {
  fontSize: 16,
  fontWeight: "600",
};

const $colorBox: ViewStyle = {
  width: 16,
  height: 16,
  marginLeft: spacing.small,
};

const $sizeBox: ViewStyle = {
  width: 40,
  aspectRatio: 1,
  borderRadius: 999,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.white,
  marginLeft: spacing.small,
};

const $sizeBoxActive: ViewStyle = {
  backgroundColor: color.primary,
};

const $footer: ViewStyle = {
  ...presetStyle.rowCenter,
  paddingHorizontal: spacing.medium,
};

const $addToCartButton: ViewStyle = {
  ...presetStyle.button,
  marginHorizontal: 0,
  paddingHorizontal: spacing.medium,
};

const ProductDetailScreen: FC<StackScreenProps<any>> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const dispact = useAppDispatch();

  const colorList = useAppSelector((state) => state.product.colorList);
  const sizeList = useAppSelector((state) => state.product.sizeList);

  const [choosingSize, setChoosingSize] = useState<Size>();

  const product: Product = route.params?.product;
  const productColor = colorList.find((x) => x.id === product.colorId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: product.name,
      headerBackTitle: "Trở về",
    });
  });

  const handleAddToCart = () => {
    if (!choosingSize) {
      Alert.alert("Chọn kích cỡ", "Vui lòng chọn kích cỡ bạn mong muốn");
    } else {
      dispact(
        addToCart({
          ...product,
          cartId: product.id + product.colorId + (choosingSize?.id as any) + "",
          sizeId: choosingSize?.id,
          quantity: 1,
        })
      );
      Alert.alert("Thành công", "Thêm vào giỏ hàng thành công!", [
        {
          text: "Tiến hành thanh toán",
          onPress: () => navigation.navigate("CartScreen"),
        },
        {
          text: "Trở về",
          onPress: navigation.goBack,
        },
      ]);
    }
  };

  return (
    <View style={presetStyle.container}>
      <Image
        style={$productImage}
        source={{
          uri: product.image,
        }}
      />

      <View style={$content}>
        <Text style={presetStyle.textHeading}>{product.name}</Text>
        <Text style={$priceText}>{product.price?.toLocaleString()} VNĐ</Text>
        <Text style={$descText}>{product.desc}</Text>
        <View style={presetStyle.rowCenter}>
          <Text style={$colorText}>Màu: {productColor?.name}</Text>
          <View style={[$colorBox, { backgroundColor: productColor?.hex }]} />
        </View>

        <View style={presetStyle.rowCenter}>
          <Text style={$sizeText}>Kích cỡ:</Text>
          <View style={presetStyle.rowCenter}>
            {sizeList.map((x, i) => {
              const isActive = choosingSize?.id === x.id;
              return (
                <TouchableOpacity
                  onPress={() => setChoosingSize(x)}
                  style={[$sizeBox, isActive && $sizeBoxActive]}
                  key={i}
                >
                  <Text style={{ color: isActive ? color.white : color.black }}>
                    {x.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <View style={[$footer, { marginBottom: insets.bottom }]}>
        <View style={presetStyle.container}>
          <Text>Giá</Text>
          <Text style={[$priceText, { marginVertical: 0 }]}>
            {product.price?.toLocaleString()} VNĐ
          </Text>
        </View>

        <TouchableOpacity style={$addToCartButton} onPress={handleAddToCart}>
          <Text style={presetStyle.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

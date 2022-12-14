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
      headerBackTitle: "Tr??? v???",
    });
  });

  const handleAddToCart = () => {
    if (!choosingSize) {
      Alert.alert("Ch???n k??ch c???", "Vui l??ng ch???n k??ch c??? b???n mong mu???n");
    } else {
      dispact(
        addToCart({
          ...product,
          cartId: product.id + product.colorId + (choosingSize?.id as any) + "",
          sizeId: choosingSize?.id,
          quantity: 1,
        })
      );
      Alert.alert("Th??nh c??ng", "Th??m v??o gi??? h??ng th??nh c??ng!", [
        {
          text: "Ti???n h??nh thanh to??n",
          onPress: () => navigation.navigate("CartScreen"),
        },
        {
          text: "Tr??? v???",
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
        <Text style={$priceText}>{product.price?.toLocaleString()} VN??</Text>
        <Text style={$descText}>{product.desc}</Text>
        <View style={presetStyle.rowCenter}>
          <Text style={$colorText}>M??u: {productColor?.name}</Text>
          <View style={[$colorBox, { backgroundColor: productColor?.hex }]} />
        </View>

        <View style={presetStyle.rowCenter}>
          <Text style={$sizeText}>K??ch c???:</Text>
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
          <Text>Gi??</Text>
          <Text style={[$priceText, { marginVertical: 0 }]}>
            {product.price?.toLocaleString()} VN??
          </Text>
        </View>

        <TouchableOpacity style={$addToCartButton} onPress={handleAddToCart}>
          <Text style={presetStyle.buttonText}>Th??m v??o gi??? h??ng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

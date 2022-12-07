import React, { useMemo } from "react";
import {
  Image,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Product } from "../../redux/productSlice";
import { useAppSelector } from "../../redux/ultis";
import { color } from "../../theme/color";
import { spacing } from "../../theme/spacing";

const $itemPerRow = 2;
const $itemWidth =
  (spacing.width - spacing.medium * ($itemPerRow + 1)) / $itemPerRow;

const $root: ViewStyle = {
  width: spacing.width,
  flexDirection: "row",
  flexWrap: "wrap",
};

const $brandItem: ViewStyle = {
  backgroundColor: color.white,
  borderRadius: 12,
  marginBottom: spacing.small,
  width: $itemWidth,
  overflow: "hidden",
  marginLeft: spacing.medium,
  flexGrow: 1,
};

const $label: TextStyle = {
  margin: spacing.medium,
};

const $productImage: ImageStyle = {
  width: "100%",
  height: $itemWidth,
};

const $productContent: ViewStyle = {
  padding: spacing.medium,
};

const $brandText: TextStyle = {
  fontSize: 12,
  textTransform: "uppercase",
  color: color.primary,
};

const $productNameText: TextStyle = {
  marginVertical: spacing.tiny,
};

const $priceText: TextStyle = {
  fontWeight: "bold",
};

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

type ProductProps = {
  product: Product;
} & TouchableOpacityProps;

const ProductItem = ({ product, ...rest }: ProductProps) => {
  const brandList = useAppSelector((state) => state.brand.brandList);

  const brandName = useMemo(() => {
    const brand = brandList.find((x) => x.id === product.brandId);
    return brand?.name || "No brand";
  }, [product.brandId, brandList]);

  return (
    <TouchableOpacity {...rest}>
      <View style={$brandItem}>
        <Image style={$productImage} source={{ uri: product.image }} />
        <View style={$productContent}>
          <Text style={$brandText}>{brandName}</Text>
          <Text style={$productNameText}>{product?.name}</Text>
          <Text style={$priceText}>{product?.price?.toLocaleString()} VNĐ</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type ProductListProps = {
  productList: Product[];
  onPress: (x: Product) => void;
};

const ProductList = ({ productList, onPress }: ProductListProps) => {
  return (
    <>
      <Text style={$label}>Sản phẩm:</Text>
      <View style={$root}>
        {!productList?.length ? (
          <View style={$emptyBox}>
            <Text style={$emptyText}>
              Không có sản phẩm nào cho thương hiệu này!
            </Text>
          </View>
        ) : (
          productList.map((x, i) => (
            <ProductItem product={x} key={i} onPress={() => onPress(x)} />
          ))
        )}
      </View>
    </>
  );
};

export default ProductList;

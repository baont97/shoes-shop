import React from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Brand } from "../../redux/brandSlice";
import { Product } from "../../redux/productSlice";
import { useAppSelector } from "../../redux/ultis";
import { color } from "../../theme/color";
import { spacing } from "../../theme/spacing";

const $root: ViewStyle = {
  width: spacing.width,
  flexDirection: "row",
  flexWrap: "wrap",
};

const $brandItem: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.small,
  backgroundColor: color.white,
  borderRadius: 9999,
  marginLeft: spacing.medium,
  marginBottom: spacing.small,
};

const $label: TextStyle = {
  margin: spacing.medium,
};

const $brandItemActive: ViewStyle = {
  backgroundColor: color.primary,
};

type BrandProps = {
  brand: Brand;
  active: boolean;
} & TouchableOpacityProps;

const BrandItem = ({ brand, active, ...rest }: BrandProps) => {
  return (
    <TouchableOpacity {...rest}>
      <View style={[$brandItem, active && $brandItemActive]}>
        <Text style={{ color: active ? color.white : color.black }}>
          {brand?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

type BrandListProps = {
  activeBrand: Brand;
  onChangeBrand: (brand: Brand) => void;
};

const BrandList = ({ onChangeBrand, activeBrand }: BrandListProps) => {
  const brandList = useAppSelector((state) => [
    {
      id: 9999999,
      name: "All",
    },
    ...state.brand.brandList,
  ]);

  return (
    <>
      <Text style={$label}>Thương hiệu:</Text>
      <View style={$root}>
        {brandList.map((x, i) => {
          const isActive = activeBrand?.id === x.id;
          return (
            <BrandItem
              active={isActive}
              key={i}
              brand={x}
              onPress={() => onChangeBrand(x)}
            />
          );
        })}
      </View>
    </>
  );
};

export default BrandList;

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import { BrandList, ProductList } from "../components";
import { config } from "../config";
import { Brand, saveBrandList } from "../redux/brandSlice";
import { Product, saveProductList } from "../redux/productSlice";
import { useAppSelector } from "../redux/ultis";
import { presetStyle } from "../theme/style";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const productList = useAppSelector((state) => state.product.productList);

  const [brand, setBrand] = useState<Brand>();

  const productListByBrandId = productList.filter((x) =>
    brand?.id && brand?.id !== 9999999 ? x.brandId === brand?.id : true
  );

  const handleChangeBrand = (input: Brand) => setBrand(input);
  const handleProductPress = (input: Product) =>
    (navigation.getParent() as any).navigate("ProductDetailScreen", {
      product: input,
    });
  const getBrands = () => {
    fetch(config.baseUrl + "/typeproduct")
      .then((res) => res.json())
      .then((res) => {
        dispatch(
          saveBrandList(
            (res.result as any[]).map(({ MALOAI, TENLOAI }) => ({
              id: MALOAI,
              name: TENLOAI,
            }))
          )
        );
      });
  };
  const getProducts = () => {
    fetch(config.baseUrl + "/getproduct")
      .then((res) => res.json())
      .then((res) => {
        if (res.result) {
          dispatch(
            saveProductList(
              (res.result as any[]).map((x) => ({
                id: x.MAGIAY,
                name: x.TENGIAY,
                price: x.DONGIABAN,
                brandId: x.MALOAI,
                desc: x.MOTA,
                colorId: x.MAMAUSAC,
                // image: x.HINHANH,
                image:
                  "https://i0.wp.com/www.skiptomylou.org/wp-content/uploads/2022/03/how-to-draw-a-shoe-completed.jpg",
              }))
            )
          );
        }
      });
  };

  const boostrapAsync = () => {
    getBrands();
    getProducts();
  };

  useEffect(() => {
    boostrapAsync();
  }, []);

  return (
    <View style={presetStyle.container}>
      <ScrollView>
        <BrandList
          activeBrand={brand as Brand}
          onChangeBrand={handleChangeBrand}
        />
        <ProductList
          productList={productListByBrandId}
          onPress={handleProductPress}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

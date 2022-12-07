import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authSlice";
import { useAppSelector } from "../redux/ultis";
import { spacing } from "../theme/spacing";
import { presetStyle } from "../theme/style";

const $button: ViewStyle = {
  marginBottom: spacing.medium,
  ...presetStyle.button,
};

const SettingsScreen = () => {
  const userDetail = useAppSelector((state) => state.auth.userDetail);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <View style={presetStyle.container}>
      <ScrollView>
        <View style={presetStyle.rowItem}>
          <Text style={presetStyle.label}>Khách hàng</Text>
          <Text>{userDetail.HOTENKH}</Text>
        </View>

        <View style={[presetStyle.rowItem, { marginTop: 0 }]}>
          <Text style={presetStyle.label}>Địa chỉ</Text>
          <Text>{userDetail.DIACHI}</Text>
        </View>

        <View style={[presetStyle.rowItem, { marginTop: 0 }]}>
          <Text style={presetStyle.label}>Số điện thoại</Text>
          <Text>{userDetail.DIENTHOAI}</Text>
        </View>

        <View style={[presetStyle.rowItem, { marginTop: 0 }]}>
          <Text style={presetStyle.label}>Email</Text>
          <Text>{userDetail.EMAIL}</Text>
        </View>

        <View style={[presetStyle.rowItem, { marginTop: 0 }]}>
          <Text style={presetStyle.label}>Tên đăng nhập</Text>
          <Text>{userDetail.TENDNKH}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={$button} onPress={handleLogOut}>
        <Text style={presetStyle.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

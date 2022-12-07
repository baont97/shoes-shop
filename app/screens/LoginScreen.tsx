import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch } from "react-redux";
import { config } from "../config";
import { login, UserDetail } from "../redux/authSlice";
import { spacing } from "../theme/spacing";
import { presetStyle } from "../theme/style";

const $input: ViewStyle = {
  marginTop: spacing.medium,
  ...presetStyle.textInput,
};

const $button: ViewStyle = {
  marginTop: spacing.medium,
  ...presetStyle.button,
};

const LoginScreen = () => {
  const dispatch = useDispatch();

  // states
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!userName || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
    } else {
      setLoading(true);
      fetch(config.baseUrl + "/getuser/1")
        .then((res) => res.json())
        .then((res) => {
          if (res.result) {
            const users: UserDetail[] = res.result;

            const index = users.findIndex(
              (x) =>
                x.TENDNKH?.toLowerCase() === userName?.toLowerCase() &&
                x.MATKHAUKH?.toLowerCase() === password?.toLowerCase()
            );
            if (index === -1) {
              Alert.alert("Lỗi", "Tài khoản hoặc mật khẩu không chính xác.", [
                { text: "Thử lại" },
              ]);
            } else {
              dispatch(login(res.result[0]));
            }
          }
        })
        .catch(() => Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại sau."))
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={presetStyle.container}>
      <ScrollView keyboardDismissMode="on-drag">
        <TextInput
          style={$input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Tên đăng nhập"
        />
        <TextInput
          style={$input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          secureTextEntry
        />
        <TouchableOpacity style={$button} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={presetStyle.buttonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

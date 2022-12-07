import { Dimensions } from "react-native";

export const spacing = {
  tiny: 4,
  small: 8,
  medium: 15,
  large: 20,
  ...Dimensions.get("window"),
};

import { StyleSheet } from "react-native";
import { color } from "./color";
import { spacing } from "./spacing";

export const presetStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.primary,
    marginHorizontal: spacing.medium,
    borderRadius: spacing.tiny,
  },
  buttonText: {
    color: color.white,
  },
  textInput: {
    height: 40,
    backgroundColor: color.white,
    marginHorizontal: spacing.medium,
    borderRadius: spacing.tiny,
    paddingHorizontal: spacing.medium,
  },
  textHeading: {
    fontSize: 22,
    fontWeight: "500",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowItem: {
    flexDirection: "row",
    backgroundColor: color.white,
    paddingHorizontal: spacing.medium,
    marginHorizontal: spacing.medium,
    marginVertical: spacing.small,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderRadius: spacing.tiny,
  },
  label: {
    fontSize: 12,
    color: color.gray,
  },
  headerButton: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  headerImage: {
    width: 24,
    height: 24,
    tintColor: color.primary,
  },
});

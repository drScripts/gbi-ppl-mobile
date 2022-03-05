import { StyleSheet, StatusBar, View } from "react-native";

export const VerticalSpacer = () => {
  return <View style={generalStyles.spacer} />;
};

export const generalStyles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "white",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    height: 90,
  },
});

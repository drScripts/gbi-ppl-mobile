import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  Pressable,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const Headerinformation = () => {
  const { user } = useAuth();

  const navigation = useNavigation();

  return (
    <View style={styles.shadowSingleSide}>
      <View style={styles.card}>
        <Text style={styles.nameTxt} numberOfLines={2} ellipsizeMode={"tail"}>
          Hello,{"\n"}
          {user.fullName}
        </Text>
        <Pressable onPress={() => navigation.navigate("UserSettings")}>
          <Image
            source={{
              uri: user.picturePath,
            }}
            style={styles.profilePicture}
          />
        </Pressable>
      </View>
    </View>
  );
};

export const HeaderInformationSingle = ({ title = "Page Title" }) => {
  return (
    <View style={styles.shadowSingleSide}>
      <View style={styles.cardSingle}>
        <Text
          style={styles.headerTitle}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowSingleSide: {
    width: "100%",
    backgroundColor: "#EEEE",
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    overflow: "hidden",
    paddingBottom: 3,
    zIndex: 1,
    borderBottomEndRadius: 14,
    borderBottomStartRadius: 14,
  },
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 15,
    padding: 14,
    borderBottomStartRadius: 14,
    borderBottomEndRadius: 14,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  nameTxt: {
    fontSize: 18,
  },
  profilePicture: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  cardSingle: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 15,
    padding: 20,
    borderBottomStartRadius: 14,
    borderBottomEndRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Headerinformation;

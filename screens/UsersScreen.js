import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  TextInput,
} from "react-native";
import useAuth from "../hooks/useAuth";
import GeneralScreen from "./GeneralScreen";
import { VerticalSpacer } from "../shared";
import { MaterialIcons } from "@expo/vector-icons";
import { Generalbutton } from "../components/InputComponent";

const UserProfileItem = ({ title, value, placeholder, readOnly = false }) => {
  return (
    <View style={styles.widthFull}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={styles.items}
        editable={!readOnly}
      />
    </View>
  );
};

const Usersscreen = () => {
  const { logOut, user } = useAuth();

  const onChangePicture = () => {
    console.log("CHange");
  };

  return (
    <GeneralScreen singleHeaderTitle={"Profile"}>
      <View style={styles.containerCenter}>
        <VerticalSpacer />
        <View style={styles.mb20}>
          <Image
            source={{
              uri: user.picturePath,
            }}
            style={styles.userPicture}
          />
          <Pressable onPress={onChangePicture} style={styles.iconBackdrop}>
            <MaterialIcons name="flip-camera-android" size={52} color="white" />
          </Pressable>
        </View>
        <UserProfileItem
          title={"Full Name"}
          placeholder={"Your Full Name"}
          value={user.fullName}
        />
        <UserProfileItem
          title={"Phone Number"}
          placeholder={"Your Phone Number"}
          value={user.phoneNumber}
        />
        <UserProfileItem
          title={"Your Address"}
          placeholder={"Your Address"}
          value={user.address}
        />
        <UserProfileItem
          title={"Special Code"}
          placeholder={"Your Special Code"}
          value={user.specialCode}
          readOnly={true}
        />

        <Generalbutton
          title={"Logout"}
          style={styles.logoutBtn}
          onPressed={async () => {
            await logOut();
          }}
        />
      </View>
    </GeneralScreen>
  );
};

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 14,
  },
  userPicture: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  iconBackdrop: {
    position: "absolute",
    backgroundColor: "rgba(234, 234, 234, 0.3)",
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  widthFull: {
    width: "100%",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  items: {
    fontSize: 16,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 2,
  },
  mb20: {
    marginBottom: 20,
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: "red",
  },
});

export default Usersscreen;

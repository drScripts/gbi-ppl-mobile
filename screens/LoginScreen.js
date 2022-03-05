import { Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import {
  AuthInputArea,
  Generalbutton,
  Textbutton,
} from "../components/InputComponent";
import GeneralScreen from "./GeneralScreen";

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");

  const { login, isLoading, error, setError } = useAuth();

  const phoneNumberHandler = (text) => {
    setPhoneNumber(text);
  };

  const passwordHandler = (text) => {
    setpassword(text);
  };

  const onSubmit = () => {
    if (phoneNumber && password) {
      login(phoneNumber, password);
    } else {
      setError("Silahkan isi form dengan benar!");
    }
  };

  const onDismis = () => {
    setError(null);
  };

  return (
    <GeneralScreen
      error={error}
      isLoading={isLoading}
      onErrorDismiss={onDismis}
      safeAreaColor={"#5DBDF4"}
    >
      <View style={styles.container}>
        <View style={styles.backgroundLayer}></View>
        <Image
          source={require("../assets/gbi_ppl.png")}
          style={styles.logoImage}
        />
        <View style={styles.centerCard}>
          <Text style={styles.title}>Login</Text>
          <AuthInputArea
            title={"Phone Number"}
            placeholder={"Input Your Phone Number"}
            keyBoardType={"numeric"}
            icon={<Entypo name="phone" size={20} color={"black"} />}
            handler={phoneNumberHandler}
          />
          <AuthInputArea
            title={"Your Password"}
            placeholder={"Input Your Password"}
            isPassword={true}
            icon={<FontAwesome5 name="key" size={20} color={"black"} />}
            handler={passwordHandler}
          />
          <Generalbutton title={"Login"} onPressed={onSubmit} />
        </View>
        <Textbutton
          btnText={"Register."}
          sideText={"Belum punya akun?"}
          onPressed={() => {
            navigation.navigate("Register");
          }}
        />
      </View>
    </GeneralScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  backgroundLayer: {
    height: "50%",
    width: "100%",
    backgroundColor: "#5DBDF4",
    position: "absolute",
  },
  logoImage: {
    width: 200,
    height: 150,
    marginTop: 15,
  },
  centerCard: {
    width: "90%",
    padding: 22,
    marginTop: 38,
    marginBottom: 32,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
});

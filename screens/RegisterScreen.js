import { Image, StyleSheet, Text, View } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { get } from "../services/UserServices";
import useAuth from "../hooks/useAuth";
import {
  AuthInputArea,
  Dropdownarea,
  Textbutton,
  Generalbutton,
} from "../components/InputComponent";

import GeneralScreen from "./GeneralScreen";

export default function RegisterScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [fullName, setfullName] = useState("");
  const [verifyPassword, setverifyPassword] = useState("");
  const [selectedRegion, setSelectedRegion] = useState();
  const { register, isLoading, error, setError } = useAuth(1);
  const [region, setRegion] = useState([]);

  const phoneNumberHandler = (text) => {
    setPhoneNumber(text);
  };

  const passwordHandler = (text) => {
    setpassword(text);
  };

  const passwordVerifyHandler = (text) => {
    setverifyPassword(text);
  };

  const dropDownHandler = (value) => {
    setSelectedRegion(value);
  };

  const fullNameHandler = (value) => {
    setfullName(value);
  };

  const onErrorDismiss = () => {
    setError(null);
  };

  const onSubmit = async () => {
    if (phoneNumber && password && fullName && verifyPassword) {
      if (verifyPassword !== password) {
        setError("Silahkan periksa kembali password yang anda masukan");
      } else {
        register(phoneNumber, fullName, selectedRegion, password);
      }
    } else {
      setError("Silahkan isi seluruh form dengan benar");
    }
  };

  const getRegionData = async () => {
    const { data, message, status } = await get({ pathUrl: "/regions" });

    if (status === 200) {
      const newRegionArray = data.data.map((value, i) => {
        return { label: value.name, value: value.id };
      });
      if (newRegionArray) {
        setSelectedRegion(newRegionArray[0].value);
      }
      setRegion(newRegionArray);
    } else {
      setError(message);
    }
  };

  useEffect(() => {
    getRegionData();
  }, []);

  return (
    <GeneralScreen
      isLoading={isLoading}
      error={error}
      onErrorDismiss={onErrorDismiss}
      safeAreaColor={"#5DBDF4"}
    >
      <View style={styles.container}>
        <View style={styles.backgroundLayer} />
        <Image
          source={require("../assets/gbi_ppl.png")}
          style={styles.logoImage}
        />
        <View style={styles.centerCard}>
          <Text style={styles.title}>Register</Text>
          <AuthInputArea
            title={"Phone Number"}
            placeholder={"Input Your Phone Number"}
            keyBoardType={"numeric"}
            icon={<Entypo name="phone" size={20} color={"black"} />}
            handler={phoneNumberHandler}
          />
          <AuthInputArea
            title={"Your Full Name"}
            placeholder={"Input Your Full Name"}
            icon={<Entypo name="user" size={20} color={"black"} />}
            handler={fullNameHandler}
          />
          <AuthInputArea
            title={"Your Password"}
            placeholder={"Input Your Password"}
            isPassword={true}
            icon={<FontAwesome5 name="key" size={20} color={"black"} />}
            handler={passwordHandler}
          />
          <AuthInputArea
            title={"Your Password Again"}
            placeholder={"Input Your Password Again"}
            isPassword={true}
            icon={<FontAwesome5 name="key" size={20} color={"black"} />}
            handler={passwordVerifyHandler}
          />
          <Dropdownarea
            title={"Select Region"}
            onChange={dropDownHandler}
            selectedValue={selectedRegion}
            data={region}
          />
          <Generalbutton title={"Register"} onPressed={onSubmit} />
        </View>
        <Textbutton
          btnText={"Login."}
          sideText={"Sudah punya akun?"}
          onPressed={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </GeneralScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#EEEE",
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

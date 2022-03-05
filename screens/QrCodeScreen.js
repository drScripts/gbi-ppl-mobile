import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import useAuth from "../hooks/useAuth";
import QRCode from "react-native-qrcode-svg";
import { StackActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GeneralScreen from "./GeneralScreen";

const QrCodeScreen = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <GeneralScreen
      singleHeaderTitle={"QR Member Identity"}
      centeredView
      floatingActionButtonIcon={
        user.role === "admin" && (
          <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
        )
      }
      floatingActionButtonOnClick={() => {
        const pushAction = StackActions.push("ScanQr");
        navigation.dispatch(pushAction);
      }}
    >
      <View style={styles.container}>
        <Text style={[styles.informationText, styles.marginBottomMedium]}>
          Pastikan anda sudah mendaftarkan akun{"\n"} ini untuk jadwal ibadah.
        </Text>
        <QRCode
          value={`GBI_PPL_SCHEDULE_SCAN_${user.specialCode}`}
          logo={require("../assets/gbi_ppl.png")}
          logoSize={30}
          size={200}
          backgroundColor={"transparent"}
        />
        <Text style={{ marginBottom: 19, marginTop: 8 }}>
          {user.specialCode}
        </Text>
        <Text style={styles.informationText}>
          Silahkan Tunjukan QrCode kepada petugas untuk mengecek kevalidtan data
          anda!
        </Text>
      </View>
    </GeneralScreen>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#EEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  informationText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  marginBottomMedium: {
    marginBottom: 26,
  },
});

export default QrCodeScreen;

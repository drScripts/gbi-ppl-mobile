import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import useSchedule from "../hooks/userSchedule";
import { HeaderInformationSingle } from "../components/HeaderInformation";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import LottieAnimationView from "lottie-react-native";
import { Generalbutton } from "../components/InputComponent";
import { LoadingModal } from "../components/ModalComponent";

const NoCameraPermissionComponent = ({ onPressed }) => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <HeaderInformationSingle title={"Scan Qrcode"} />
      <View style={[styles.container, styles.centeredContainer]}>
        <Text style={styles.noPermissionText}>No Camera Permission !</Text>
        <TouchableOpacity onPress={onPressed}>
          <Text style={styles.setPermissionBtnText}>Set Permission</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const UserInformationSection = ({ title, value }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.informationTitle}>{title}</Text>
      <Text style={styles.informationItem}>{value}</Text>
    </View>
  );
};

const UserScheduleCheck = ({ success, data, onContinue }) => {
  const lottieFile = success
    ? require("../assets/success-lottie.json")
    : require("../assets/faileds-lottie.json");

  return (
    <View
      style={[styles.usersContainer, data ? {} : { justifyContent: "center" }]}
    >
      <View style={styles.spacer} />
      <View style={styles.alignItemsCenter}>
        <LottieAnimationView
          autoPlay={true}
          loop={false}
          source={lottieFile}
          style={styles.animation}
        />
      </View>
      <Text
        style={[styles.title, success ? styles.greenColor : styles.redColor]}
      >
        {success ? "Terdaftar!" : "Tidak Terdafatar!"}
      </Text>
      {data ? (
        <>
          <UserInformationSection
            title={"Full Name"}
            value={data.user.full_name}
          />
          <UserInformationSection
            title={"Count Persons"}
            value={`${data.attendance.persons} Persons`}
          />
          <UserInformationSection
            title={"Vaccine Status"}
            value={`${data.user.user_vaccine.length} times vaccine`}
          />
          <UserInformationSection
            title={"Region"}
            value={`GBI PPL - ${data.user.region.name}`}
          />
        </>
      ) : (
        <></>
      )}
      <Generalbutton
        title={"Continue"}
        onPressed={onContinue}
        style={{ marginTop: 36 }}
      />
    </View>
  );
};

const Qrscanbarcode = () => {
  const [permission, setPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [startScan, setstartScan] = useState(true);

  const {
    isLoading,
    userAttendance,
    error,
    setAttendance,
    onErrorCompleteShown,
    setOnFalseAttendanceCode,
    clearUserAttendanceState,
  } = useSchedule();

  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status === "granted");
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (permission === null) {
    return <NoCameraPermissionComponent onPressed={() => getPermission()} />;
  }

  if (permission === false) {
    return <NoCameraPermissionComponent onPressed={() => getPermission()} />;
  }

  const onBarcodeScanned = async ({ _, data }) => {
    if (data.search("GBI_PPL_SCHEDULE_SCAN_") !== -1) {
      await setAttendance(data.split("GBI_PPL_SCHEDULE_SCAN_")[1]);
    } else {
      setOnFalseAttendanceCode();
    }
    setstartScan(false);
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <LoadingModal isVisible={isLoading} />
      <HeaderInformationSingle title={"Scan Qrcode"} />
      <View style={styles.container}>
        {startScan ? (
          <Camera
            type={cameraType}
            onBarCodeScanned={onBarcodeScanned}
            style={[styles.camera, styles.centeredContainer]}
          >
            <Ionicons name="ios-scan" size={300} color="white" />
          </Camera>
        ) : (
          <UserScheduleCheck
            success={error === null}
            data={userAttendance}
            onContinue={() => {
              clearUserAttendanceState();
              onErrorCompleteShown();
              setstartScan(true);
            }}
          />
        )}
      </View>
    </SafeAreaView>
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
    backgroundColor: "#424242",
    marginTop: 10,
  },
  camera: {
    flex: 1,
    backgroundColor: "#424242",
  },
  centeredContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noPermissionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  setPermissionBtnText: {
    fontSize: 16,
    color: "#2D9CDB",
    textDecorationLine: "underline",
  },
  spacer: {
    height: 70,
  },
  usersContainer: {
    backgroundColor: "#EEEE",
    flex: 1,
    paddingHorizontal: 14,
  },
  animation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  redColor: {
    color: "#FF6464",
  },
  greenColor: {
    color: "#4FCB6A",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  informationTitle: {
    color: "#979797",
    fontSize: 18,
    fontWeight: "bold",
  },
  informationItem: {
    fontWeight: 18,
    fontWeight: "bold",
  },
});

export default Qrscanbarcode;

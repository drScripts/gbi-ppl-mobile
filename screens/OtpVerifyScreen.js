import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { Generalbutton } from "../components/InputComponent";
import GeneralScreen from "./GeneralScreen";
import moment from "moment";

const Otpverifyscreen = () => {
  const { isLoading, otpVerify, resendOtp, error, setError, preAuth } =
    useAuth();
  const [countTime, setcountTime] = useState(0);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [intervalController, setIntervalController] = useState();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const CELL_COUNT = 6;

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = "-";

    if (symbol) {
      textChild = "•";
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    );
  };

  const setTimer = () => {
    let timer = setInterval(() => {
      let now = moment().unix();
      let time = preAuth.otp_exp - (now + 60);
      setcountTime(time);
      if (time <= 0) {
        clearInterval(intervalController);
      }
      time--;
    }, 1000);

    setIntervalController(timer);
  };

  const onSubmit = async () => {
    clearInterval(intervalController);
    await otpVerify(value);
  };

  const resendCode = async () => {
    await resendOtp();
    setTimer();
  };

  const onDismiss = async () => {
    setError(null);
    setTimer();
  };

  useEffect(() => {
    clearInterval(intervalController);
    setTimer();
    return () => {
      clearInterval(intervalController);
    };
  }, []);

  return (
    <GeneralScreen
      error={error}
      isLoading={isLoading}
      onErrorDismiss={onDismiss}
      safeAreaColor={"#5DBDF4"}
    >
      <View style={styles.container}>
        <View style={styles.backgroundLayer}></View>
        <Image
          source={require("../assets/gbi_ppl.png")}
          style={styles.logoImage}
        />
        <View style={styles.centerCard}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.information}>
            Silahkan cek whatsapp untuk mendapatkan code OTP
          </Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          {countTime === 0 ? (
            <Pressable onPress={resendCode}>
              <Text style={[styles.countDownText, styles.resendText]}>
                Resend Code
              </Text>
            </Pressable>
          ) : (
            <Text style={styles.countDownText}>
              {Math.floor(countTime / 60)}:
              {`${
                Math.ceil(countTime % 60).toString().length <= 1 ? "0" : ""
              }` + Math.ceil(countTime % 60)}{" "}
              Remaining
            </Text>
          )}
          <Generalbutton
            title={"Verify"}
            onPressed={onSubmit}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </GeneralScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#EEE",
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
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
  countDownText: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 12,
  },
  information: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  resendText: {
    textDecorationLine: "underline",
    color: "#2D9CDB",
  },
});

export default Otpverifyscreen;

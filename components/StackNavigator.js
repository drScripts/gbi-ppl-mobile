import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "../hooks/useAuth";
import Tabnavigator from "../screens/TabNavigator";
import Otpverifyscreen from "../screens/OtpVerifyScreen";
import QRScanBarcode from "../screens/QRScanbarcode";
import UsersScreen from "../screens/UsersScreen";
import DetailPostPage from "../screens/DetailPostPage";

const Stack = createStackNavigator();

const Stacknavigator = () => {
  const { user, preAuth } = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={"Login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      {preAuth ? (
        <Stack.Screen name="OtpVerify" component={Otpverifyscreen} />
      ) : user ? (
        user.role === "user" ? (
          <>
            <Stack.Screen name="Home" component={Tabnavigator} />
            <Stack.Screen name="UserSettings" component={UsersScreen} />
            <Stack.Screen name="DetailPostPage" component={DetailPostPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Tabnavigator} />
            <Stack.Screen name="ScanQr" component={QRScanBarcode} />
            <Stack.Screen name="UserSettings" component={UsersScreen} />
          </>
        )
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Stacknavigator;

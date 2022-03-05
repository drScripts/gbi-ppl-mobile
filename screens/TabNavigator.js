import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import ApplyScheduleScreen from "./ApplyScheduleScreen";
import QrCodeScreen from "./QrCodeScreen";
import Postscreen from "./PostScreen";
import Homescreen from "./HomeScreen";
import KhotbahScreen from "../screens/KhotbahScreen";

const Tab = createMaterialBottomTabNavigator();

const Tabnavigator = () => {
  return (
    <Tab.Navigator initialRouteName={"Homes"}>
      <Tab.Screen
        name={"Homes"}
        component={Homescreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons name="ios-home" size={24} color={"white"} />
            ) : (
              <Ionicons name="ios-home-outline" size={24} color={"white"} />
            );
          },
        }}
      />
      <Tab.Screen
        name={"Ibadah"}
        component={ApplyScheduleScreen}
        options={{
          title: "Ibadah",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome5 name="church" size={20} color={"white"} />
            ) : (
              <MaterialCommunityIcons name="church" size={24} color="white" />
            );
          },
        }}
      />
      <Tab.Screen
        name={"QrCode"}
        component={QrCodeScreen}
        options={{
          title: "QRCode",
          tabBarIcon: () => {
            return <FontAwesome5 name="qrcode" size={24} color="white" />;
          },
        }}
      />
      <Tab.Screen
        name={"Posts"}
        component={Postscreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <MaterialCommunityIcons name="post" size={24} color="white" />
            ) : (
              <MaterialCommunityIcons
                name="post-outline"
                size={24}
                color="white"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={"Khotbah"}
        component={KhotbahScreen}
        options={{
          title: "Khotbah",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome5 name="bible" size={24} color="white" />
            ) : (
              <Feather name="book" size={24} color="white" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabnavigator;

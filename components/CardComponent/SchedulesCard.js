import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import {
  AntDesign,
  MaterialIcons,
  Entypo,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { CardSection } from "./ScheduleCard";

const Schedulescard = ({ data, selected, onPressed }) => {
  if (data.currentPeople >= data.maxPeople) {
    return (
      <View style={styles.container}>
        <View style={styles.alert}>
          <Text style={styles.alertTxt}>Sudah Penuh !</Text>
        </View>
        <View style={styles.card}>
          <View>
            <CardSection
              title={data.regionPlace}
              icon={<Entypo name="location" size={24} color="black" />}
              style={styles.mb10}
            />
            <CardSection
              title={data.date}
              icon={<Ionicons name="calendar" size={24} color="black" />}
              style={styles.mb10}
            />
            <CardSection
              title={data.time}
              icon={<Ionicons name="time" size={24} color="black" />}
              style={styles.mb10}
            />
            <CardSection
              title={data.persons}
              icon={<FontAwesome5 name="users" size={24} color="black" />}
              style={styles.mb10}
            />
          </View>
          <MaterialIcons name="cancel" size={24} color="red" />
        </View>
      </View>
    );
  } else {
    return (
      <Pressable style={styles.container} onPress={() => onPressed(data)}>
        <View style={styles.card}>
          <View>
            <CardSection
              title={data.regionPlace}
              icon={<Entypo name="location" size={24} color="black" />}
              style={styles.mb10}
            />
            <CardSection
              title={data.date}
              icon={<Ionicons name="calendar" size={24} color="black" />}
              style={styles.mb10}
            />
            <CardSection
              title={data.time}
              icon={<Ionicons name="time" size={24} color="black" />}
              style={styles.mb10}
            />
            <CardSection
              title={data.persons}
              icon={<FontAwesome5 name="users" size={24} color="black" />}
              style={styles.mb10}
            />
          </View>
          <AntDesign
            name="checkcircle"
            size={24}
            color={
              selected
                ? data.id === selected.id
                  ? "#B4FE98"
                  : "#CCCCCC"
                : "#CCCCCC"
            }
          />
        </View>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    marginHorizontal: 14,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alert: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    zIndex: 1,
  },
  alertTxt: {
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
  },
  mb10: {
    marginBottom: 10,
  },
});

export default Schedulescard;

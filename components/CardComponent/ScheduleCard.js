import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

export function CardSection({ icon, title, textColor = "black", style }) {
  return (
    <View style={[styles.cardSection, style]}>
      {icon}
      <Text style={[{ color: textColor }, styles.description]}>{title}</Text>
    </View>
  );
}

const Schedulecard = ({ data }) => {
  return (
    <View style={styles.card}>
      <CardSection
        title={data.date}
        textColor={"#828282"}
        icon={<AntDesign name="exclamationcircle" size={24} color="#FF6868" />}
        style={styles.section}
      />
      <CardSection
        title={data.regionPlace}
        icon={<Entypo name="location" size={24} color="black" />}
        style={styles.section}
      />
      <CardSection
        title={data.time}
        icon={<Ionicons name="time" size={24} color="black" />}
        style={styles.section}
      />
      <CardSection
        title={data.persons}
        icon={<Ionicons name="person" size={24} color="black" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    marginStart: 10,
  },
  section: {
    marginBottom: 8,
  },
});

export default Schedulecard;

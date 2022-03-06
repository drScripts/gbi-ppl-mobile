import React from "react";
import GeneralScreen from "./GeneralScreen";
import { StyleSheet, View, Text, Image } from "react-native";
import { VerticalSpacer } from "../shared";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { Generalbutton } from "../components/InputComponent";

const KhotbahItemInfo = ({ text, icon, style }) => {
  return (
    <View style={[styles.rowFlexItem, styles.rowContainer, style]}>
      {icon}
      <Text style={styles.textItem}>{text}</Text>
    </View>
  );
};

const KhotbahDetail = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <GeneralScreen singleHeaderTitle={"Khotbah"}>
      <View style={styles.container}>
        <VerticalSpacer />
        <Image source={{ uri: item.image_path }} style={styles.banner} />
        <Text style={styles.title}>{item.title}</Text>
        <View style={[styles.rowContainer, styles.mb10]}>
          <KhotbahItemInfo
            text={item.pembawa}
            icon={<Fontisto name="person" size={24} color="black" />}
          />
          <KhotbahItemInfo
            text={item.khotbah_date}
            icon={<FontAwesome5 name="calendar-day" size={24} color="black" />}
          />
        </View>
        <KhotbahItemInfo
          text={item.bahan}
          icon={<FontAwesome5 name="bible" size={24} color="black" />}
          style={styles.mb10}
        />
        <View style={styles.divider} />
        <Text style={styles.khotbah}>{item.khotbah}</Text>
        <Generalbutton
          title={"Continue"}
          style={styles.mt10}
          onPressed={() => {
            navigation.goBack();
          }}
        />
      </View>
    </GeneralScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    padding: 14,
  },
  banner: {
    width: "100%",
    height: 230,
    borderRadius: 18,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 14,
  },
  khotbah: {
    textAlign: "justify",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowFlexItem: {
    flex: 1,
  },
  textItem: {
    marginStart: 14,
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  divider: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    height: 5,
    marginBottom: 20,
  },
});

export default KhotbahDetail;

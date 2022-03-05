import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Dropdownarea = ({ title, data, selectedValue, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, _) => onChange(itemValue)}
        >
          {data.map((value, index) => (
            <Picker.Item label={value.label} value={value.value} key={index} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 15,
  },
});

export default Dropdownarea;

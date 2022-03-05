import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const AuthInputArea = (props) => {
  const {
    title = "Title",
    keyBoardType = "default",
    isPassword = false,
    icon,
    placeholder,
    handler,
  } = props;
  return (
    <View style={styles.inputAreaContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          keyboardType={keyBoardType}
          secureTextEntry={isPassword}
          onChangeText={(text) => handler(text)}
        />
        {icon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputAreaContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  textIcon: {
    flex: 1,
  },
  textInput: {
    width: "85%",
    fontSize: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default AuthInputArea;

import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

const SnackbarNormal = ({ title, visible }) => {
  return <Snackbar visible={visible}>{title}</Snackbar>;
};

export const ErrorSnackBar = ({ title, visible, onDismiss }) => {
  return (
    <Snackbar
      visible={visible}
      style={styles.errorSnackBar}
      onDismiss={onDismiss}
      duration={4000}
    >
      {title}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  errorSnackBar: {
    backgroundColor: "red",
    color: "white",
  },
});

export default SnackbarNormal;

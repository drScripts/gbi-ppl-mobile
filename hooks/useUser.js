import React, { useContext, createContext, useState } from "react";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const User = createContext();

export const UserProvider = ({ children }) => {
  const [error, setError] = useState("");

  const saveUserInformation = async (data) => {
    try {
      await AsyncStorageLib.setItem("user_information", JSON.stringify(data));
    } catch (e) {
      setError(e);
    }
  };

  const removeUserInformation = async () => {
    try {
      await AsyncStorageLib.removeItem("user_information");
    } catch (e) {
      setError(e);
    }
  };

  const getUserInformation = async () => {
    try {
      const user = await AsyncStorageLib.getItem("user_information");
      return JSON.parse(user);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <User.Provider
      value={{
        getUserInformation,
        saveUserInformation,
        removeUserInformation,
        error,
      }}
    >
      {children}
    </User.Provider>
  );
};

export default function useUser() {
  return useContext(User);
}

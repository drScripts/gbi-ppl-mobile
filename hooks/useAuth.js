import React, { useContext, createContext, useState, useEffect } from "react";
import useUser from "./useUser";
import { post } from "../services/UserServices";
import { userResponseFormatter } from "../helpers/helper";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [preAuth, setPreAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { saveUserInformation, getUserInformation, removeUserInformation } =
    useUser();

  const login = async (phoneNumber, password) => {
    setIsLoading(true);
    const { data, status, message } = await post({
      pathUrl: "/login",
      postData: { phone_number: phoneNumber, password: password },
    });

    if (status == 200) {
      setPreAuth(data);
    } else if (status === 400) {
      setError("Silahkan periksa kembali nomor telepon dan password anda!");
    } else {
      setError(message);
    }
    setIsLoading(false);
  };

  const otpVerify = async (otp) => {
    setIsLoading(true);
    const { data, message, status } = await post({
      pathUrl: "/verifyOtp",
      postData: {
        special_code: preAuth.special_code,
        otp: otp,
      },
    });

    if (status === 200) {
      const userData = userResponseFormatter(data.user, data.token);
      setuser(userData);
      await saveUserInformation(userData);
      setPreAuth(null);
    } else {
      setError(message);
    }

    setIsLoading(false);
  };

  const resendOtp = async () => {
    setIsLoading(true);
    const { data, message, status } = await post({
      pathUrl: "/regenerateOtp",
      postData: {
        special_code: preAuth.special_code,
      },
    });

    if (status === 200) {
      setPreAuth(data);
    } else {
      setError(message);
    }

    setIsLoading(false);
  };

  const register = async (phoneNumber, fullName, region, password) => {
    setIsLoading(true);

    const { data, message, status } = await post({
      pathUrl: "/register",
      postData: {
        full_name: fullName,
        phone_number: phoneNumber,
        cabang_id: region,
        address: "Jawa Barat",
        password,
      },
    });

    if (status === 200) {
      setIsLoading(false);
      setPreAuth(data);
      return true;
    } else {
      setIsLoading(false);
      setError(message);
      return false;
    }
  };

  const checkUserInformation = async () => {
    const userInfo = await getUserInformation();
    if (userInfo) setuser(userInfo);
  };

  const logOut = async () => {
    setuser(null);
    await removeUserInformation();
  };

  const registerNotifToken = async () => {};

  useEffect(() => {
    checkUserInformation();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        preAuth,
        isLoading,
        error,
        login,
        register,
        otpVerify,
        resendOtp,
        logOut,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

import React, { useContext, createContext, useState } from "react";
import { getWithAuth, postWithAuth } from "../services/UserServices";
import useAuth from "./useAuth";
import { currentScheduleFormatter } from "../helpers/helper";

const Schedule = createContext();

export const UserScheduleProvider = ({ children }) => {
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [userAttendance, setUserAttendance] = useState(null);

  const { user } = useAuth();

  const getCurrent = async () => {
    setisLoading(true);
    const { data, message, status } = await getWithAuth({
      urlPath: "/attendance/current",
      token: user.token,
    });

    if (status === 200) {
      if (data !== null) {
        setCurrent(currentScheduleFormatter(data));
      } else {
        setCurrent(null);
      }
    } else {
      setError(message);
    }
    setisLoading(false);
  };

  const setAttendance = async (special_code) => {
    setisLoading(true);
    const { data, message, status } = await postWithAuth({
      pathUrl: "/attendance/d?_method=PUT",
      postData: { special_code },
      token: user.token,
    });
    if (status === 200) {
      setUserAttendance(data);
    } else {
      setError(message);
      setUserAttendance(null);
    }

    setisLoading(false);
  };

  const clearUserAttendanceState = () => {
    setUserAttendance(null);
  };

  const setOnFalseAttendanceCode = () => {
    setisLoading(true);
    setUserAttendance({ message: "Wrong Barcode!" });
    setisLoading(false);
  };

  const addSchedule = async (schedule_id, persons) => {
    setisLoading(true);
    const { _, message, status } = await postWithAuth({
      pathUrl: "/attendance",
      postData: { schedule_id, persons },
      token: user.token,
    });

    setisLoading(false);
    if (status != 200) {
      setError(message);
    }
    return status;
  };

  const onErrorCompleteShown = () => {
    setError(null);
  };

  return (
    <Schedule.Provider
      value={{
        current,
        error,
        isLoading,
        userAttendance,
        getCurrent,
        addSchedule,
        onErrorCompleteShown,
        setAttendance,
        clearUserAttendanceState,
        setOnFalseAttendanceCode,
      }}
    >
      {children}
    </Schedule.Provider>
  );
};

export default function useSchedule() {
  return useContext(Schedule);
}

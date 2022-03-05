import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { getWithAuth } from "../../services/UserServices";
import useAuth from "../../hooks/useAuth";
import { schedulesFormatter } from "../../helpers/helper";
import { useFocusEffect } from "@react-navigation/native";
import { Schedulescard } from "../CardComponent";
import AnimatedLottieView from "lottie-react-native";

const Schedulecontainer = ({ selected, onselectedChange, onDataGet }) => {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  const getSchedules = async () => {
    const {
      data: schedules,
      _,
      status,
    } = await getWithAuth({
      urlPath: `/schedule`,
      token: user.token,
    });

    if (status === 200) {
      setData(schedulesFormatter(schedules));
      onDataGet(schedulesFormatter(schedules));
    } else {
      setData([]);
      onDataGet([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSchedules();
    }, [])
  );

  const onPressedHandler = (data) => {
    onselectedChange(data);
  };

  return (
    <View>
      {data.length > 0 ? (
        data.map((value, _) => (
          <Schedulescard
            data={value}
            onPressed={onPressedHandler}
            key={value.id}
            selected={selected}
          />
        ))
      ) : (
        <AnimatedLottieView
          autoPlay={true}
          loop={true}
          source={require("../../assets/nodata.json")}
          style={styles.animation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 300,
    height: 300,
  },
});

export default Schedulecontainer;

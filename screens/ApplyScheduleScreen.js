import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import useSchedule from "../hooks/userSchedule";
import { useFocusEffect } from "@react-navigation/native";
import { ScheduleContainer } from "../components/SectionContainer";
import { Generalbutton } from "../components/InputComponent";
import { AntDesign } from "@expo/vector-icons";
import Generalscreen from "./GeneralScreen";

const CounterField = ({ peopleAdded, peopleAddedHandler, style }) => {
  return (
    <View style={[styles.counterContainer, style]}>
      <Text style={styles.counterTitle}>Jumlah (max: 2 orang) : </Text>
      <View style={styles.counterCounter}>
        <Pressable onPress={() => peopleAddedHandler(peopleAdded - 1)}>
          <AntDesign name="minuscircle" size={24} color={"black"} />
        </Pressable>
        <Text style={styles.counterText}>{peopleAdded}</Text>
        <Pressable onPress={() => peopleAddedHandler(peopleAdded + 1)}>
          <AntDesign name="pluscircle" size={24} color={"black"} />
        </Pressable>
      </View>
    </View>
  );
};

const ApplyScheduleScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const [peopleAdded, setPeopleAdded] = useState(1);
  const [scheduleData, setScheduleData] = useState([]);
  const {
    current,
    addSchedule,
    getCurrent,
    error,
    onErrorCompleteShown,
    isLoading,
  } = useSchedule();

  const selectedChangeHandler = (data) => {
    setSelected(data);
    setPeopleAdded(1);
  };

  const peopleAddedHandler = (count) => {
    if (count <= 2 && count >= 1) {
      setPeopleAdded(count);
    }
  };

  const onSubmit = async () => {
    if (selected) {
      const status = await addSchedule(selected.id, peopleAdded);
      if (status == 200) {
        await getCurrent();
      }
    }
  };

  const onScheduleDataChange = (datas) => {
    setScheduleData(datas);
  };

  useFocusEffect(
    useCallback(() => {
      getCurrent();
      return () => {
        setSelected(null);
        setPeopleAdded(1);
      };
    }, [])
  );

  return (
    <Generalscreen
      navigation={navigation}
      onErrorDismiss={onErrorCompleteShown}
      error={error}
      alreadyScheduleVisible={current != null}
      singleHeaderTitle={"Daftar Ibadah"}
      isLoading={isLoading}
      removePadding={current !== null}
      centeredView={scheduleData.length === 0}
    >
      <>
        <View style={styles.spacer} />
        <ScheduleContainer
          onselectedChange={selectedChangeHandler}
          selected={selected}
          peopleAdded={peopleAdded}
          peopleAddedHandler={peopleAddedHandler}
          onDataGet={onScheduleDataChange}
        />
        {scheduleData.length > 0 && (
          <>
            <CounterField
              peopleAdded={peopleAdded}
              peopleAddedHandler={peopleAddedHandler}
            />
            <View style={styles.buttonField}>
              <Generalbutton title={"Add Schedule"} onPressed={onSubmit} />
            </View>
          </>
        )}
      </>
    </Generalscreen>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 80,
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 14,
    marginBottom: 20,
  },
  counterCounter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterText: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  marginHorizontal: {
    marginHorizontal: 18,
  },
  buttonField: {
    marginBottom: 18,
    paddingHorizontal: 18,
  },
});

export default ApplyScheduleScreen;

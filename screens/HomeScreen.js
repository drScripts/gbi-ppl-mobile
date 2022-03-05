import React, { useCallback } from "react";
import useSchedule from "../hooks/userSchedule";
import { useFocusEffect } from "@react-navigation/native";
import { ScheduleCard } from "../components/CardComponent";
import { HomeSection, Youtubesection } from "../components/SectionContainer";
import GeneralScreen from "./GeneralScreen";
import { VerticalSpacer } from "../shared";

const Homescreen = () => {
  const { current, getCurrent } = useSchedule();

  useFocusEffect(
    useCallback(() => {
      getCurrent();
    }, [])
  );

  return (
    <GeneralScreen headerInformation={true}>
      <VerticalSpacer />
      {current ? (
        <HomeSection
          title={"Your Schedules"}
          style={{
            marginEnd: 14,
            marginStart: 14,
          }}
        >
          <ScheduleCard data={current} />
        </HomeSection>
      ) : (
        <></>
      )}
      <Youtubesection
        pathUrl={"/youtube/upcoming"}
        title={"Youtube Up Coming Video"}
      />
      <Youtubesection pathUrl={"/youtube/"} title={"Youtube Available Video"} />
    </GeneralScreen>
  );
};

export default Homescreen;

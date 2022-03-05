import React from "react";
import GeneralScreen from "./GeneralScreen";
import { Announcementcontainer } from "../components/SectionContainer";

const Postscreen = ({ navigation }) => {
  return (
    <GeneralScreen singleHeaderTitle={"Announcements"} disableScroll={true}>
      <Announcementcontainer navigation={navigation} />
    </GeneralScreen>
  );
};

export default Postscreen;

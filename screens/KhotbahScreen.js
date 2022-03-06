import React from "react";
import GeneralScreen from "./GeneralScreen";
import { KhotbahContainer } from "../components/SectionContainer";

const KhotbahScreen = ({ navigation }) => {
  return (
    <GeneralScreen singleHeaderTitle={"Khotbah"} disableScroll={true}>
      <KhotbahContainer navigation={navigation} />
    </GeneralScreen>
  );
};

export default KhotbahScreen;

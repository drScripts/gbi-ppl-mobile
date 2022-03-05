import React from "react";
import GeneralScreen from "./GeneralScreen";
import { KhotbahContainer } from "../components/SectionContainer";

const KhotbahScreen = () => {
  return (
    <GeneralScreen singleHeaderTitle={"Khotbah"} disableScroll={true}>
      <KhotbahContainer />
    </GeneralScreen>
  );
};

export default KhotbahScreen;

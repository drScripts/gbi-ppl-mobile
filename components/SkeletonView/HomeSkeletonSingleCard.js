import React from "react";
import { StyleSheet } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

const HomeSkeletonSingleCard = ({ isLoading }) => {
  return (
    isLoading && (
      <SkeletonContent
        isLoading={isLoading}
        layout={[styles.text, styles.card]}
      />
    )
  );
};

const styles = StyleSheet.create({
  text: {
    width: 200,
    height: 20,
    alignSelf: "flex-start",
    marginHorizontal: 14,
    marginVertical: 14,
  },
  card: {
    width: "90%",
    height: 150,
    marginHorizontal: 14,
    padding: 14,
  },
});

export default HomeSkeletonSingleCard;

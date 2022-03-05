import React from "react";
import { StyleSheet, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

const HomesectionskeletonScroll = ({ isLoading }) => {
  return (
    isLoading && (
      <View>
        <SkeletonContent isLoading={isLoading} layout={[styles.text]} />
        <View style={styles.row}>
          <View style={styles.card}>
            <SkeletonContent
              isLoading={isLoading}
              layout={[styles.thumbnail]}
            />
            <SkeletonContent isLoading={isLoading} layout={[styles.title]} />
          </View>
          <View style={styles.card}>
            <SkeletonContent
              isLoading={isLoading}
              layout={[styles.thumbnail]}
            />
            <SkeletonContent isLoading={isLoading} layout={[styles.title]} />
          </View>
        </View>
      </View>
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
  row: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#f2f4f7",
    padding: 12,
    width: 200,
    borderRadius: 10,
    marginStart: 14,
    marginEnd: 8,
    elevation: 5,
    marginBottom: 10,
  },
  thumbnail: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    width: "100%",
    height: 20,
    alignSelf: "flex-start",
    marginTop: 10,
  },
});

export default HomesectionskeletonScroll;

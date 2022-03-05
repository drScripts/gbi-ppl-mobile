import React from "react";
import { View, StyleSheet, Pressable, Image, Text } from "react-native";

const Youtubecard = ({
  title,
  imageUrl = "https://i.ytimg.com/vi/IskteIIrQjM/mqdefault.jpg",
}) => {
  return (
    <Pressable onPress={() => {}}>
      <View style={styles.card}>
        <View>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.thumbnail}
          />
          <View style={styles.youtubeLayer}>
            <Image
              source={require("../../assets/youtube.png")}
              style={styles.youtubeLogo}
            />
          </View>
        </View>
        <Text style={styles.title} numberOfLines={3} ellipsizeMode={"tail"}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
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
  youtubeLayer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  youtubeLogo: {
    width: 50,
    height: 36.28,
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Youtubecard;

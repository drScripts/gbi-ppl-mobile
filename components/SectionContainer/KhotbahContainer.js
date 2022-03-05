import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import { getWithAuth } from "../../services/UserServices";
import useAuth from "../../hooks/useAuth";
import { VerticalSpacer } from "../../shared";
import Bannercarousel from "./BannerCarousel";

const KhotbahCard = ({ item }) => {
  return (
    <View style={styles.wrapContainer}>
      <View style={styles.card}>
        <Image source={{ uri: item.image_path }} style={styles.image} />
        <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.title}>
          {`${item.title} - ${item.bahan}`}
        </Text>
        <Text numberOfLines={3} ellipsizeMode={"tail"}>
          {item.khotbah}
        </Text>
      </View>
    </View>
  );
};

const KhotbahContainer = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [nextUrl, setNextUrl] = useState("");

  const { user } = useAuth();

  const onReachBottom = async () => {
    console.log(`/${nextUrl}`);
  };

  const getAnnouncement = async () => {
    const { data, message, status } = await getWithAuth({
      urlPath: "/khotbah",
      token: user.token,
    });

    if (status === 200) {
      setAnnouncement(data.data);

      if (data.next_page_url) {
        const path = data.next_page_url.split("/");

        setNextUrl(path[path.length - 1]);
      }
    }
  };

  useEffect(() => {
    getAnnouncement();
  }, []);

  return (
    <FlatList
      nestedScrollEnabled
      data={announcement}
      renderItem={KhotbahCard}
      onEndReached={onReachBottom}
      ListHeaderComponent={
        <>
          <VerticalSpacer />
          <Bannercarousel urlPath={"/khotbah/banner"} />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  wrapContainer: {
    padding: 14,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 3,
    padding: 14,
    width: "100%",
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default KhotbahContainer;

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { getWithAuth } from "../../services/UserServices";
import useAuth from "../../hooks/useAuth";
import { VerticalSpacer } from "../../shared";
import Bannercarousel from "./BannerCarousel";

const AnnouncementCard = ({ item, navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("DetailPostPage", {
          titlePage: "Detail Announcement",
          item,
        });
      }}
    >
      <View style={styles.wrapContainer}>
        <View style={styles.card}>
          <Image source={{ uri: item.image_path }} style={styles.image} />
          <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={3} ellipsizeMode={"tail"}>
            {item.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const Announcementcontainer = ({ navigation }) => {
  const [announcement, setAnnouncement] = useState([]);
  const [nextUrl, setNextUrl] = useState("");

  const { user } = useAuth();

  const onReachBottom = async () => {
    if (nextUrl) {
      const { data, message, status } = await getWithAuth({
        urlPath: nextUrl,
        token: user.token,
      });

      if (status === 200) {
        setAnnouncement(data.data);

        if (data.next_page_url) {
          const path = data.next_page_url.split("/");

          setNextUrl(path[path.length - 1]);
        }
      }
    }
  };

  const getAnnouncement = async () => {
    const { data, message, status } = await getWithAuth({
      urlPath: "/announcement",
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
      renderItem={({ item }) => {
        return <AnnouncementCard item={item} navigation={navigation} />;
      }}
      onEndReached={onReachBottom}
      ListHeaderComponent={
        <>
          <VerticalSpacer />
          <Bannercarousel urlPath={"/announcement/banner"} />
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

export default Announcementcontainer;

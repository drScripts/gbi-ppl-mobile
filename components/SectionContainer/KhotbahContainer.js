import React, { useState, useCallback } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

const KhotbahCard = ({ item, navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("DetailKhotbah", {
          item,
        });
      }}
    >
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
    </Pressable>
  );
};

const KhotbahContainer = ({ navigation }) => {
  const [khotbah, setkhotbah] = useState([]);
  const [nextUrl, setNextUrl] = useState("");

  const { user } = useAuth();

  const onReachBottom = async () => {
    if (nextUrl) {
      const { data, status } = await getWithAuth({
        urlPath: nextUrl,
        token: user.token,
      });

      if (status === 200) {
        setkhotbah(data.data);

        if (data.next_page_url) {
          const path = data.next_page_url.split("/");

          setNextUrl(path[path.length - 1]);
        }
      }
    }
  };

  const getkhotbah = async () => {
    const { data, status } = await getWithAuth({
      urlPath: "/khotbah",
      token: user.token,
    });

    if (status === 200) {
      setkhotbah(data.data);

      if (data.next_page_url) {
        const path = data.next_page_url.split("/");

        setNextUrl(path[path.length - 1]);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getkhotbah();
    }, [])
  );

  return (
    <FlatList
      nestedScrollEnabled
      data={khotbah}
      renderItem={({ item }) => {
        return <KhotbahCard item={item} navigation={navigation} />;
      }}
      onEndReached={onReachBottom}
      ListHeaderComponent={
        <>
          <VerticalSpacer customHeight={85} />
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

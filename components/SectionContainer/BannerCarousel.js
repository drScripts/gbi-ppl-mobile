import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { getWithAuth } from "../../services/UserServices";
import useAuth from "../../hooks/useAuth";

const Bannercarousel = ({ urlPath }) => {
  const scrollRef = useRef();
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([]);
  let carouselInterval;
  const { user } = useAuth();

  const DeviceWidth = Dimensions.get("window").width;
  const CardWidth = DeviceWidth - 14 * 2;

  const setSelectedIndex = (event) => {
    /// width of the vewsize
    const viewSize = event.nativeEvent.layoutMeasurement.width;

    /// get current position of ScrollView
    const contentOffset = event.nativeEvent.contentOffset.x;

    const index = Math.floor(contentOffset / viewSize);

    setSelectedImage(index);
  };

  const getBanner = async () => {
    const { data, message, status } = await getWithAuth({
      urlPath: urlPath,
      token: user.token,
    });

    if (status === 200) {
      const array = data.map((value, i) => value.image_path);
      setImages(array);
      let newIndex = 0;

      carouselInterval = setInterval(() => {
        setSelectedImage(newIndex);
        scrollRef.current.scrollTo({
          animated: true,
          y: 0,
          x: CardWidth * newIndex,
        });
        newIndex === array.length - 1 ? (newIndex = 0) : newIndex++;
      }, 3000);
    }
  };

  useEffect(() => {
    getBanner();
    return () => {
      clearInterval(carouselInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        styles={styles.scrollView}
        pagingEnabled={true}
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={setSelectedIndex}
      >
        {images.map((value, i) => (
          <Image
            source={{ uri: value }}
            key={i}
            style={{
              width: CardWidth,
              height: "100%",
              borderRadius: 15,
            }}
          />
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {images.map((value, i) => (
          <View
            style={[
              styles.indicator,
              { opacity: selectedImage === i ? 1 : 0.5 },
            ]}
            key={i}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  indicatorContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
  },
  indicator: {
    width: 8,
    height: 8,
    backgroundColor: "white",
    borderRadius: 15 / 2,
    marginHorizontal: 5,
  },
});

export default Bannercarousel;

/**
 *
 * project name   :  tourism leisure application
 *
 */
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
import { API_KEY } from "../../service/leisure/api";
const ActivityCard = ({ photos }) => {
  const [images, setImages] = useState([
    {
      id: "1",
      source: require("../../assets/leisure/img/Surfing/Weligama.jpg"),
    },
    {
      id: "2",
      source: require("../../assets/leisure/img/Surfing/Mirissa.jpg"),
    },
    {
      id: "3",
      source: require("../../assets/leisure/img/Surfing/Arugambay.jpg"),
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  useEffect(() => {
    if (photos.photo_ref) {
      let photoArray = [];
      let count = 1;
      photos.photo_ref.forEach((ref) => {
        photoArray.push({
          id: count.toString(),
          source: {
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${API_KEY}`,
          },
        });
        count++;
      });
      setImages(photoArray);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.floor(
            event.nativeEvent.contentOffset.x / Dimensions.get("window").width
          );
          setCurrentIndex(slideIndex);
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.8} style={styles.imageContainer}>
            <Image source={item.source} style={[styles.image]} />
            {currentIndex === index && <View style={styles.overlay} />}
          </TouchableOpacity>
        )}
        style={[Theme.borderRadius20]}
      />
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handlePrevious}>
          <Image
            source={require("../../assets/leisure/icon/left.png")}
            style={[styles.arrowImg]}
          />
        </TouchableOpacity>
        <Text style={[styles.imageCount]}>
          {currentIndex + 1}/{images.length}
        </Text>
        <TouchableOpacity onPress={handleNext}>
          <Image
            source={require("../../assets/leisure/icon/right.png")}
            style={[styles.arrowImg]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
  },
  image: {
    width,
    height: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
  },
  navigationContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    left: 0,

    right: 0,
    bottom: 10,
    paddingHorizontal: 20,
  },
  arrow: {
    fontSize: 30,
    color: "white",
  },
  arrowImg: {
    width: 20,
    height: 20,
  },
  imageCount: {
    fontSize: 18,
    color: "white",
  },
});

export default ActivityCard;

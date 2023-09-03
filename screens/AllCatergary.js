import {
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Theme from "../assets/leisure/theme/AxTheme";
import Header from "../components/leisure/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import ActivitySmallCard from "../components/leisure/ActivitySmallCard";
import RegularButton from "../components/leisure/RegularButton";
import MapComponet from "../components/leisure/MapComponet";
import Footer from "../components/leisure/Footer";
import * as Location from "expo-location";
import { getLoacationPlaces } from "../service/leisure/LeisureService";

const AllCatergary = () => {
  const [templerating, setTempleRrating] = useState(null);
  const [heritagesrating, setHeritagesrating] = useState(null);
  const [beachesrating, setBeachesrating] = useState(null);
  const navigation = useNavigation();
  const [parksrating, setParksrating] = useState(null);
  const [artrating, setArtrating] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shop, setShop] = useState([]);

  const handleRatingChange = (text) => {
    const parsedValue = parseInt(text);
    if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue >= 10) {
      return;
    }

    setTempleRrating(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const save = () => {
    if (
      templerating === null ||
      heritagesrating === null ||
      beachesrating === null
    ) {
      Alert.alert(
        "Invalid Input",
        "Please enter all the ratings before saving."
      );
      return;
    } else if (
      templerating > 10 ||
      heritagesrating > 10 ||
      beachesrating > 10 ||
      templerating < 0 ||
      heritagesrating < 0 ||
      beachesrating < 0
    ) {
      Alert.alert(
        "Invalid Input",
        "Rating cannot be greater than 10 and cannt be lower than 0"
      );
      return;
    } else {
      AsyncStorage.setItem("temprating", templerating);
      AsyncStorage.setItem("herrating", heritagesrating);
      AsyncStorage.setItem("bchrating", beachesrating);
      AsyncStorage.setItem("parksrating", parksrating);
      AsyncStorage.setItem("artrating", artrating);

      console.log(templerating);
      console.log(heritagesrating);
      console.log(beachesrating);
      console.log(parksrating);
      console.log(artrating);

      setTempleRrating(null);
      setHeritagesrating(null);
      setBeachesrating(null);
      setParksrating(null);
      setArtrating(null);

      navigation.navigate("MarkPlac");
    }
    // All ratings are valid, proceed to save
  };

  const SCREEN_HEIGHT = Dimensions.get("window").height;

  const navigateCategory = () => {
    navigation.navigate("allCategory");
  };

  const navigateActivity = () => {
    navigation.navigate("Leisure Activity");
  };

  const getAttractivePlaces = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      let locationString = `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
      let query = "leisure+visite+places";
      let res = await getLoacationPlaces(query, locationString);
      res = res.slice(0, 5);
      setAttractions(res);
      query =
        "handloom+shops|tea+shops|gems+shops|handicrafts+shops|spices+shops|souvenir+shops";
      let res2 = await getLoacationPlaces(query, locationString);
      // save 5 shops
      res2 = res2.slice(0, 3);
      setShop(res2);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 3000);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // getAttractivePlaces();
  }, []);

  return (
    <SafeAreaView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[{ height: SCREEN_HEIGHT }]}>
          <View style={[styles.container, Theme.w100, Theme.h100]}>
            <View style={[Theme.h3]} />

            {/*Map Section ---------------------------------------------*/}
            <View style={[Theme.w90, Theme.h25, Theme.justAlign]}>
              <View style={[Theme.w95, Theme.h95, Theme.borderRadius20]}>
                <MapComponet />
              </View>
            </View>

            <View style={[Theme.h2]} />

            {/*activity nearby-------------------------------------------*/}
            <View style={[Theme.w90, Theme.h3]}>
              <Text style={[Theme.f15, Theme.ml2, Theme.mainColor3]}>
                Attractive activities nearby
              </Text>
            </View>
            {isLoading && (
              <View style={[Theme.w90, Theme.h15, Theme.flexDirRow]}>
                <View style={[Theme.w100, Theme.h100, Theme.justAlign]}>
                  <Text style={[Theme.f20, Theme.fMain3]}>Loading...</Text>
                </View>
              </View>
            )}

            {isSuccess && attractions && attractions.length > 0 && (
              <View style={[Theme.w90, Theme.h15, Theme.flexDirRow]}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {attractions.map((item, index) => (
                    <ActivitySmallCard
                      key={index}
                      CARD_TITLE={item?.name}
                      IMG_REF={item?.photos[0]?.photo_reference}
                      placeItem={item}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={[Theme.h5, Theme.w90, Theme.flexDirRow]}>
              <View style={[Theme.w70, Theme.h100]} />
              <View style={[Theme.w30, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  ON_PRESS={() => navigateCategory()}
                  HEIGHT={35}
                  BTN_NAME={"View All"}
                  TXT_COLOR={"#00D6FF"}
                  BORDER_COLOR={"#00D6FF"}
                />
              </View>
            </View>

            {/*Shop nearby-------------------------------------------*/}
            <View style={[Theme.w90, Theme.h3]}>
              <Text style={[Theme.f15, Theme.ml2, Theme.mainColor3]}>
                Shop nearby
              </Text>
            </View>
            {isLoading && (
              <View style={[Theme.w90, Theme.h15, Theme.flexDirRow]}>
                <View style={[Theme.w100, Theme.h100, Theme.justAlign]}>
                  <Text style={[Theme.f20, Theme.fMain3]}>Loading...</Text>
                </View>
              </View>
            )}

            {isSuccess && shop && shop.length > 0 && (
              <View style={[Theme.w90, Theme.h15, Theme.flexDirRow]}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {shop.map((item, index) => (
                    <ActivitySmallCard
                      key={index}
                      CARD_TITLE={item?.name}
                      IMG_REF={item.photos[0]?.photo_reference}
                      placeItem={item}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={[Theme.h5, Theme.w90, Theme.flexDirRow]}>
              <View style={[Theme.w70, Theme.h100]} />
              <View style={[Theme.w30, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  ON_PRESS={() => navigateActivity()}
                  HEIGHT={35}
                  BTN_NAME={"View All"}
                  TXT_COLOR={"#00D6FF"}
                  BORDER_COLOR={"#00D6FF"}
                />
              </View>
            </View>

            <View style={[Theme.h17]} />
          </View>
        </View>
      </ScrollView>
      <View style={[Theme.h5]}>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
  },
});

export default AllCatergary;

/**
 *
 * project name   :  tourism leisure application
 *
 */
import React, { useState, useEffect } from "react";
import { Dimensions, ScrollView, Text, View, SafeAreaView } from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
import ActivityCateCard from "../../components/leisure/ActivityCateCard";
import * as Location from "expo-location";
import { getLoacationPlaces } from "../../service/leisure/LeisureService";
import { useRoute } from "@react-navigation/native";

import NetInfo from "@react-native-community/netinfo";

const WhereToGo = () => {
  const route = useRoute();
  const searchText = route.params.searchText;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const getLocation = async (getText) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      console.log("getText", getText);
      let locationData = await Location.geocodeAsync(getText);
      console.log(
        "locationData",
        locationData[0].latitude,
        locationData[0].longitude
      );
      locationString = `${locationData[0].latitude},${locationData[0].longitude}`;
      setLocation(locationData[0]);
      let query = "leisure+visite+places";
      // get all places
      let placeData = await getLoacationPlaces(query, locationString);
      setPlaces(placeData);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 2000);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("searchText", searchText);
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        // You're connected to the internet
        console.log("You're connected to the internet");
      } else {
        // No internet connection
        console.log("No internet connection");
      }
    });
    getLocation(searchText);
  }, []);

  return (
    <SafeAreaView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container]}>
          <View style={[Theme.w95, Theme.h90, Theme.justAlign]}>
            {/* Loading */}
            {isLoading && (
              <View style={[Theme.w100, Theme.h100, Theme.justAlign]}>
                <Text style={[Theme.f20, Theme.fMain3]}>Loading...</Text>
              </View>
            )}
            {/* Success */}
            {isSuccess && places && places.length > 0 && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {places.map((place, index) => (
                  <ActivityCateCard
                    key={index}
                    ACTIVITY_NAME={place.name}
                    IMG_REF={place.photos[0].photo_reference}
                    placeItem={place}
                  />
                ))}
              </ScrollView>
            )}
          </View>

          <View style={[Theme.w90, Theme.h5]}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WhereToGo;

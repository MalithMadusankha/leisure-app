/**
 *
 * project name   :  tourism leisure application
 *
 */
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Dimensions,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
import * as Location from "expo-location";
import ActivityCateCard from "../../components/leisure/ActivityCateCard";
import { getRecormmend } from "../../service/leisure/LeisureService";

const SuggestActivityScreen = () => {
  const route = useRoute();
  const msg = route.params.msg;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlSuggestions = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      // let currentLocation = await Location.geocodeAsync(getText);
      let licationString = `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`;
      // console.log("licationString", licationString);
      // console.log("msg", msg);
      let suggestions = await getRecormmend(licationString, msg);
      // console.log("suggestions", suggestions);
      setData(suggestions);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 2000);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    console.log("msg u ", msg);
    handlSuggestions();
  }, []);

  return (
    <SafeAreaView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container]}>
          <View style={[Theme.h5, Theme.justAlign]}>
            <Text style={[Theme.f20, Theme.mainColor3]}>
              You might like these
            </Text>
          </View>

          {isLoading && (
            <View style={[Theme.w95, Theme.h80, Theme.justAlign]}>
              <View style={[Theme.w50, Theme.h20, Theme.center]}>
                <Text
                  style={[Theme.f20, Theme.mainColor3, Theme.txtAlignCenter]}
                >
                  Loading...
                </Text>
              </View>
            </View>
          )}

          {isSuccess && data && data.length > 0 && (
            <View style={[Theme.w95, Theme.h80, Theme.justAlign]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {data.map((item, index) => (
                  <ActivityCateCard
                    key={index}
                    ACTIVITY_NAME={item.name}
                    IMG_REF={item.photo_reference}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          <View style={[Theme.w90, Theme.h5]}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuggestActivityScreen;

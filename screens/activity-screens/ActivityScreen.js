/**
 *
 * project name   :  tourism leisure application
 *
 */
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
import Header from "../../components/leisure/Header";
import ActivityCard from "../../components/leisure/ActivityCard";
import RegularButton from "../../components/leisure/RegularButton";
import MapComponet from "../../components/leisure/MapComponet";
import { useRoute } from "@react-navigation/native";
import { createActivity } from "../../service/leisure/LeisureService";

const ActivityScreen = () => {
  const route = useRoute();

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [selectedDate, setSelectedDate] = useState("");
  const [resData, setResData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [about, setAbout] = useState("");
  const [time, setTime] = useState("");

  const addActivity = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      let objActivity = {
        place_id: resData.place_id,
        name: resData.name,
        address: resData.address,
        rating: resData.rating,
        photo_ref: resData.photo_ref,
        lat: resData.lat.toString(),
        lng: resData.lng.toString(),
        type: resData.type,
        about: about,
        time: time,
        date: date,
      };
      let res = await createActivity(objActivity);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const placeItem = route.params.placeItem;
    console.log("placeItem", placeItem);
    setResData(placeItem);
    // fetchPlaceDetails(place_id);
  }, []);

  return (
    <ScrollView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container, { marginTop: 20 }]}>
          <View style={[Theme.h1]} />
          <View style={[Theme.w90, Theme.h20, Theme.bgBlack]}>
            {resData && <ActivityCard photos={resData} />}
          </View>
          <View style={[Theme.h1]} />
          <View style={[Theme.w85, Theme.h7, Theme.justAlign]}>
            {resData ? (
              <Text style={[Theme.f20, Theme.black]}>{resData.name}</Text>
            ) : (
              <Text style={[Theme.f20, Theme.black]}>Activity Name</Text>
            )}
          </View>
          <View style={[Theme.w90, Theme.h10]}>
            <Text style={[Theme.f15, Theme.black]}>About</Text>
            <TextInput
              multiline
              placeholder={"Description"}
              numberOfLines={3}
              style={styles.textArea}
              value={about}
              onChangeText={(text) => setAbout(text)}
            />
          </View>
          <View style={[Theme.w90, Theme.h10, Theme.mt3]}>
            <Text style={[Theme.f15, Theme.black]}>Time</Text>
            <TextInput
              placeholder={"9.00 AM - 5.00 PM"}
              value={time}
              style={styles.input}
              onChangeText={(text) => setTime(text)}
            />
          </View>
          <View style={[Theme.w90, Theme.h10]}>
            <Text style={[Theme.f15, Theme.black]}>Date</Text>
            <TextInput
              placeholder={"2021-09-20"}
              style={styles.input}
              value={date}
              onChange={(event) => setDate(event.nativeEvent.text)}
            />
          </View>
          <View style={[Theme.h2]} />

          <View style={[Theme.w100, Theme.h5, Theme.justAlign]}>
            <RegularButton
              BTN_NAME={"Add"}
              HEIGHT={40}
              BG_COLOR={"#4BA84F"}
              BORDER_COLOR={"#FFFFFF"}
              TXT_COLOR={"#FFFFFF"}
              ON_PRESS={addActivity}
            />
          </View>
          <View style={[Theme.h1]} />
          {/*Map Section ---------------------------------------------*/}
          <View style={[Theme.w90, Theme.h20, Theme.justAlign]}>
            <View style={[Theme.w100, Theme.h100, Theme.borderRadius20]}>
              <MapComponet />
            </View>
          </View>
          <View style={[Theme.h14]}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activityCateCard: {
    width: 360,
    height: 140,
  },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "gray",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  textArea: {
    height: "80%",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#737373",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  datePicker: {
    width: 200,
  },

  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: "#737373",
  },
});

export default ActivityScreen;

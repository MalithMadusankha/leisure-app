import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";
import Theme from "../assets/leisure/theme/AxTheme";
import NearbyCard from "../components/leisure/NearbyCard";
import SearchBar from "../components/leisure/SearchBar";
import RegularButton from "../components/leisure/RegularButton";
import MenuCard from "../components/leisure/MenuCard";
import Footer from "../components/leisure/Footer";
import * as Location from "expo-location";
import { getLoacationPlaces } from "../service/leisure/LeisureService";

const HomeScreen = () => {
  const navigation = useNavigation();
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  // get kandy places
  const getKandy = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      // get Kandy coordinates
      let locationData = await Location.geocodeAsync("Kandy");
      locationString = `${locationData[0].latitude},${locationData[0].longitude}`;
      let query = "leisure+visite+places|safari|hiking|surfing|water+rafting";
      let res = await getLoacationPlaces(query, locationString);
      res = res.slice(0, 5);
      setData(res);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    // getKandy();
  }, []);

  useEffect(() => {
    if (isTyping) {
      setTimeout(() => {
        setIsTyping(false);
      }, 5000);
    }
  }, [isTyping]);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
      {/* First Section */}

      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[styles.container, Theme.w100, Theme.h100]}>
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.centeredView}
            >
              <View style={styles.modalView}>

     
              </View>
            </TouchableOpacity>
          </Modal> */}

          {/*search bar------------------------------------------------------*/}
          <TouchableOpacity style={[Theme.w90, Theme.h20, Theme.justAlign]}>
            <SearchBar
              isTyping={setIsTyping}
              openModal={openModal}
              navigation={navigation}
            />
          </TouchableOpacity>
          {/*Nearby section ----------------------------------------*/}
          {isTyping && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Nearby")}
              style={[
                Theme.w90,
                Theme.h7,
                Theme.flexDirRow,
                Theme.bgWhite,
                Theme.borderRadius20,
                { borderColor: "#000000", borderWidth: 1 },
                Theme.mt_10,
                Theme.mb3,
              ]}
            >
              <View style={[Theme.w20, Theme.h100, Theme.justAlign]}>
                <Image
                  source={require("../assets/leisure/icon/nearby.png")}
                  resizeMode="contain"
                  style={[Theme.w50]}
                />
              </View>

              <View style={[Theme.w80, Theme.h100, Theme.justifyCenter]}>
                <Text style={[Theme.f17, Theme.black]}>Nearby</Text>
              </View>
            </TouchableOpacity>
          )}

          {/*discover card --------------------------------------------------*/}
          <View
            style={[
              Theme.w90,
              Theme.h25,
              Theme.justAlign,
              Theme.bgMain3,
              Theme.borderRadius20,
            ]}
          >
            <View style={[Theme.w95, Theme.h50, Theme.justAlign]}>
              <Text style={[Theme.f25, Theme.txtAlignCenter, Theme.fWhite]}>
                Discover more in Colombo
              </Text>
            </View>
            <View style={[Theme.w100, Theme.h30, Theme.justAlign]}>
              <View style={[Theme.w50, Theme.h80, Theme.justAlign]}>
                <RegularButton
                  HEIGHT={45}
                  BTN_NAME={"View All"}
                  TXT_COLOR={"#FFFFFF"}
                  BORDER_COLOR={"#FFFFFF"}
                  ON_PRESS={() => navigation.navigate("More in Colombo")}
                />
              </View>
            </View>
          </View>

          {isLoading && (
            <View style={[Theme.w100, Theme.h10, Theme.justAlign]}>
              <Text style={[Theme.f20, Theme.fMain3]}>Loading...</Text>
            </View>
          )}

          {isSuccess && (
            <View style={[Theme.w90, Theme.h50]}>
              <View style={[Theme.w100, Theme.h30, Theme.justifyCenter]}>
                <Text style={[Theme.ml2, Theme.black, Theme.f20]}>
                  You might like these
                </Text>

                <Text style={[Theme.ml2, Theme.black, Theme.f15]}>
                  more things to do in kandy
                </Text>
              </View>
              {data && data.length > 0 && (
                <View style={[Theme.w100, Theme.h60, Theme.mt2]}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {data.map((place, index) => (
                      <MenuCard
                        key={index}
                        IMG_REF={place.photos[0].photo_reference}
                        placeItem={place}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}
              <View style={[Theme.w100, Theme.h35, Theme.flexDirRow]}>
                <View style={[Theme.w80, Theme.h100]} />
                <View style={[Theme.w15, Theme.h50, Theme.justAlign]}>
                  <TouchableOpacity
                    style={[
                      Theme.w100,
                      Theme.h100,
                      Theme.ml30,
                      Theme.justAlign,
                    ]}
                  >
                    <Image
                      source={require("../assets/leisure/icon/chat.png")}
                      resizeMode="contain"
                      style={[Theme.w80, Theme.h50]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* Footer  */}
        <View style={[Theme.h5]}>
          <Footer />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    width: "100%",
    height: "100%",
    marginTop: 0,
    padding: 10,
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#5DD9F1",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HomeScreen;

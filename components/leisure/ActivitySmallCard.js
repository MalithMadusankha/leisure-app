/**
 *
 * project name   :  tourism leisure application
 *
 */
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
import { API_KEY } from "../../service/leisure/api";
import { saveFavorite } from "../../service/leisure/LeisureService";

const ActivitySmallCard = ({ IMG_REF, CARD_TITLE, placeItem }) => {
  const styles = StyleSheet.create({
    activityMiniCard: {
      width: 180,
    },
    cardRadius: {
      borderBottomLeftRadius: 11,
      borderBottomRightRadius: 11,
    },
  });

  const addFaviorite = () => {
    console.log("addFaviorite", placeItem);
    let res = saveFavorite(placeItem);
  };

  return (
    <View style={[styles.activityMiniCard, Theme.h100, Theme.justAlign]}>
      <ImageBackground
        imageStyle={[Theme.w100, Theme.h100, Theme.borderRadius10]}
        style={[Theme.w90, Theme.h95]}
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${IMG_REF}&key=${API_KEY}`,
        }}
      >
        <View
          style={[
            Theme.w100,
            Theme.h30,
            Theme.justAlign,
            Theme.flexDirRow,
            Theme.mt2,
          ]}
        >
          <View style={[Theme.w60, Theme.h100]} />
          <TouchableOpacity
            style={[
              Theme.w20,
              Theme.h90,
              Theme.bgWhite,
              Theme.justAlign,
              Theme.borderRadius20,
            ]}
            onPress={() => addFaviorite()}
          >
            <Image
              source={require("../../assets/leisure/icon/like-hart.png")}
              style={[Theme.w70, Theme.h70]}
            />
          </TouchableOpacity>
        </View>

        <View style={[Theme.w100, Theme.h50]}></View>

        <View
          style={[
            Theme.w100,
            Theme.h20,
            Theme.mt_2,
            Theme.bgLightDark,
            styles.cardRadius,
            Theme.justAlign,
          ]}
        >
          <Text style={[Theme.f15, Theme.fWhite]}>{CARD_TITLE}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ActivitySmallCard;

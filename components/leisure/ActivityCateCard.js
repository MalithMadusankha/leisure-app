/**
 *
 * project name   :  tourism leisure application
 *
 */
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
// import Stars from "react-native-stars";
import { API_KEY } from "../../service/leisure/api";
import { saveFavorite } from "../../service/leisure/LeisureService";

const ActivityCateCard = ({ IMG_REF, ACTIVITY_NAME, ON_PRESS, placeItem }) => {
  const styles = StyleSheet.create({
    activityCateCard: {
      width: 360,
      height: 140,
    },
    myStarStyle: {
      color: "yellow",
      backgroundColor: "transparent",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    myEmptyStarStyle: {
      color: "white",
    },
    imgRadius: {
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    },
  });

  const addFaviorite = () => {
    console.log("addFaviorite", placeItem);
    let res = saveFavorite(placeItem);
  };

  return (
    <View style={[styles.activityCateCard, Theme.justAlign]}>
      <View
        style={[
          Theme.w95,
          Theme.h90,
          Theme.bgMain3,
          Theme.flexDirRow,
          Theme.borderRadius20,
        ]}
      >
        <View style={[Theme.w40, Theme.h100, Theme.justAlign]}>
          <View style={[Theme.w95, Theme.h95, Theme.justAlign]}>
            <Image
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${IMG_REF}&key=${API_KEY}`,
              }}
              resizeMode="contain"
              style={[Theme.w95, Theme.h95, styles.imgRadius]}
            />
          </View>
        </View>

        <View style={[Theme.w45, Theme.h100, Theme.justAlign]}>
          <Text style={[Theme.f17, Theme.fWhite]}> {ACTIVITY_NAME} </Text>

          <View style={[Theme.w100, Theme.h20]}>
            {/* <Stars
              default={0}
              count={5}
              half={false}
              starSize={50}
              fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
              emptyStar={
                <Icon
                  name={"star-outline"}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name={"star-half"} style={[styles.myStarStyle]} />
              }
            /> */}
          </View>
        </View>

        <View style={[Theme.w15, Theme.h100, Theme.justAlign]}>
          <TouchableOpacity
            style={[
              Theme.w80,
              Theme.h30,
              Theme.bgWhite,
              Theme.mt2,
              Theme.justAlign,
              Theme.borderRadius20,
            ]}
            onPress={() => addFaviorite()}
          >
            <Image
              source={require("../../assets/leisure/icon/like-hart.png")}
              style={[Theme.w60, Theme.h60]}
            />
          </TouchableOpacity>

          <View style={[Theme.h60]} />
        </View>
      </View>
    </View>
  );
};

export default ActivityCateCard;

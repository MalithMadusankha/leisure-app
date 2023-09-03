/**
 *
 * project name   :  tourism leisure application
 *
 */
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
// import Stars from "react-native-stars";
import { API_KEY } from "../../service/leisure/api";
import { saveFavorite } from "../../service/leisure/LeisureService";
import { useNavigation } from "@react-navigation/native";

const FavoriteActivityCateCard = ({
  IMG_REF,
  ACTIVITY_NAME,
  place_id,
  placeItem,
}) => {
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

  const navigation = useNavigation();

  const navigateActivity = () => {
    navigation.navigate("Leisure Activity", { placeItem: placeItem });
  };

  useEffect(() => {
    console.log("F place_id", place_id);
  }, []);

  return (
    <View style={[styles.activityCateCard, Theme.justAlign]}>
      <TouchableOpacity
        onPress={() => navigateActivity()}
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
          <View
            style={[
              Theme.w80,
              Theme.h30,
              Theme.bgWhite,
              Theme.mt2,
              Theme.justAlign,
              Theme.borderRadius20,
            ]}
          >
            <Image
              source={require("../../assets/leisure/icon/pink-hart.jpg")}
              style={[Theme.w65, Theme.h60]}
            />
          </View>

          <View style={[Theme.h60]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteActivityCateCard;

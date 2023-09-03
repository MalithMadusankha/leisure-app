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
  TouchableOpacity,
  View,
} from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
import { API_KEY } from "../../service/leisure/api";
import { saveFavorite } from "../../service/leisure/LeisureService";

const MenuCard = ({ IMG_REF, placeItem }) => {
  const styles = StyleSheet.create({
    menuCardStyles: {
      width: 355,
      height: "90%",
    },
    img: {
      width: 50,
    },
  });

  const addFaviorite = () => {
    console.log("addFaviorite", placeItem);
    let res = saveFavorite(placeItem);
  };

  return (
    <View style={[styles.menuCardStyles, Theme.justAlign]}>
      <View style={[Theme.w100, Theme.h100, Theme.justAlign]}>
        <ImageBackground
          imageStyle={[
            Theme.w100,
            Theme.h100,
            Theme.justAlign,
            Theme.borderRadius20,
          ]}
          style={[Theme.w95, Theme.h95]}
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${IMG_REF}&key=${API_KEY}`,
          }}
        >
          <View style={[Theme.w100, Theme.h20, Theme.flexDirRow]}>
            <View style={[Theme.w85, Theme.h100]} />

            <TouchableOpacity
              style={[
                Theme.w10,
                Theme.h90,
                Theme.justAlign,
                Theme.bgWhite,
                Theme.borderRadius20,
                Theme.mt2,
              ]}
              onPress={() => addFaviorite()}
            >
              <Image
                source={require("../../assets/leisure/icon/like-hart.png")}
                resizeMode="contain"
                style={[Theme.w50, Theme.h70]}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default MenuCard;

/**
 *
 * project name   :  tourism leisure application
 *
 */
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";

const NearbyCard = ({ LOCATION_IMG, LOCATION_NAME, LOCATION }) => {
  const styles = StyleSheet.create({
    cardSize: {
      height: 80,
      borderTopWidth: 1,
      borderTopColor: "#b7b7b7",
    },
  });

  return (
    <View
      style={[Theme.w100, styles.cardSize, Theme.flexDirRow, Theme.justAlign]}
    >
      <View style={[Theme.w20, Theme.h100, Theme.justAlign]}>
        <Image
          source={LOCATION_IMG}
          resizeMode="contain"
          style={[Theme.w100]}
        />
      </View>

      <View style={[Theme.w80, Theme.h100, Theme.justAlign]}>
        <View style={[Theme.w100, Theme.h35, Theme.justifyCenter, Theme.ml10]}>
          <Text style={[Theme.black, Theme.f17, Theme.mt2]}>
            {LOCATION_NAME}
          </Text>
        </View>

        <View style={[Theme.w100, Theme.h30, Theme.ml10]}>
          <Text style={[Theme.black, Theme.mt2]}>{LOCATION}</Text>
        </View>

        <View style={[Theme.h10]} />
      </View>
    </View>
  );
};

export default NearbyCard;

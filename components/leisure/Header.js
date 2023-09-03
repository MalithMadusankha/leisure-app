/**
 *
 * project name   :  tourism leisure application
 *
 */
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";

const Header = ({ ScreenName }) => {
  return (
    <View style={[Theme.w100, Theme.h100, Theme.flexDirRow, Theme.bgBlack]}>
      <View style={[Theme.w80, Theme.h100, Theme.justifyCenter]}>
        <Text style={[Theme.ml7, Theme.f20, Theme.mainColor3]}>
          {" "}
          {ScreenName}{" "}
        </Text>
      </View>
      <TouchableOpacity
        style={[Theme.w20, Theme.h100, Theme.container_bg_none]}
      >
        <Image
          source={require("../../assets/leisure/icon/user.png")}
          resizeMode="contain"
          style={[Theme.w40]}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Header;

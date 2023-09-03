/**
 *
 * project name   :  tourism leisure application
 *
 */
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";

const RegularButton = ({
  BTN_NAME,
  BG_COLOR,
  BORDER_COLOR,
  TXT_COLOR,
  HEIGHT,
  ON_PRESS,
}) => {
  const styles = StyleSheet.create({
    btn: {
      height: HEIGHT,
      backgroundColor: BG_COLOR,
      borderColor: BORDER_COLOR,
    },
    txt: {
      color: TXT_COLOR,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.btn, Theme.bgMainBorder, Theme.w90, Theme.justAlign]}
      onPress={ON_PRESS}
    >
      <Text style={[Theme.mt1, Theme.f15, styles.txt]}>{BTN_NAME}</Text>
    </TouchableOpacity>
  );
};

export default RegularButton;

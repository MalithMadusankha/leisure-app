import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate("plan")}>
          <Image
            source={require("../../assets/leisure/icon/category.png")}
            resizeMode="contain"
            style={styles.menuIcons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("favorite")}>
          <Image
            source={require("../../assets/leisure/icon/plan.png")}
            resizeMode="contain"
            style={styles.menuIcons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Leisure")}>
          <Image
            source={require("../../assets/leisure/icon/home-fill.png")}
            resizeMode="contain"
            style={styles.menuIcons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("chatbot")}>
          <Image
            source={require("../../assets/leisure/icon/chat.png")}
            resizeMode="contain"
            style={styles.menuIcons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  menuIcons: {
    width: 40,
    height: 40,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
  },
});

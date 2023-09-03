/**
 *
 * project name   :  tourism leisure application
 *
 */
import React from "react";
import { Dimensions, ScrollView, View, SafeAreaView } from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
import Header from "../../components/leisure/Header";
import RegularButton from "../../components/leisure/RegularButton";
import ActivityCateCard from "../../components/leisure/ActivityCateCard";

const ActivityCategoryScreen = () => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  return (
    <SafeAreaView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container]}>
          <View style={[Theme.w90, Theme.h15]}>
            <View
              style={[Theme.w100, Theme.h50, Theme.justAlign, Theme.flexDirRow]}
            >
              <View style={[Theme.w50, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  BTN_NAME={"Adventures"}
                  HEIGHT={30}
                  TXT_COLOR={"#000000"}
                />
              </View>

              <View style={[Theme.w25, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  BTN_NAME={"Safari"}
                  HEIGHT={30}
                  TXT_COLOR={"#000000"}
                />
              </View>

              <View style={[Theme.w25, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  BTN_NAME={"Hiking"}
                  HEIGHT={30}
                  TXT_COLOR={"#000000"}
                />
              </View>
            </View>

            <View
              style={[Theme.w100, Theme.h50, Theme.justAlign, Theme.flexDirRow]}
            >
              <View style={[Theme.w25, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  BTN_NAME={"Surfing"}
                  HEIGHT={30}
                  TXT_COLOR={"#000000"}
                />
              </View>

              <View style={[Theme.w25, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  BTN_NAME={"Map"}
                  HEIGHT={30}
                  TXT_COLOR={"#000000"}
                />
              </View>

              <View style={[Theme.w25, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  BTN_NAME={"9 May"}
                  HEIGHT={30}
                  TXT_COLOR={"#000000"}
                />
              </View>

              <View style={[Theme.w25, Theme.h100, Theme.justAlign]}>
                <RegularButton
                  BTN_NAME={"Filter"}
                  HEIGHT={30}
                  TXT_COLOR={"#000000"}
                />
              </View>
            </View>
          </View>

          <View style={[Theme.w90, Theme.h63]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <ActivityCateCard
                ACTIVITY_NAME={"Minneriya"}
                IMG_URL={require("../../assets/leisure/img/Safari/Minneriya.jpg")}
              />
              <ActivityCateCard
                ACTIVITY_NAME={"Kaudulla"}
                IMG_URL={require("../../assets/leisure/img/Safari/Kaudulla.jpg")}
              />
              <ActivityCateCard
                ACTIVITY_NAME={"Wilpattu"}
                IMG_URL={require("../../assets/leisure/img/Safari/Wilpattu.jpg")}
              />
              <ActivityCateCard
                ACTIVITY_NAME={"Udawalawa"}
                IMG_URL={require("../../assets/leisure/img/Safari/Udawalawa.jpg")}
              />
            </ScrollView>
          </View>

          <View style={[Theme.h15]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActivityCategoryScreen;

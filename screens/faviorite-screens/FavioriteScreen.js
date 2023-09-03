/**
 *
 * project name   :  tourism leisure application
 *
 */
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View, SafeAreaView } from "react-native";
import Theme from "../../assets/leisure/theme/AxTheme";
import ActivityCateCard from "../../components/leisure/ActivityCateCard";
import { getFavorite } from "../../service/leisure/LeisureService";
import FavoriteActivityCateCard from "../../components/leisure/FavoriteActivityCateCard";
import { useNavigation } from "@react-navigation/native";

const FavioriteScreen = () => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation;
  const getFavoritePlaces = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const res = await getFavorite();
      setData(res.data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getFavoritePlaces();
  }, []);

  return (
    <SafeAreaView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container]}>
          <View style={[Theme.w95, Theme.h90, Theme.justAlign]}>
            {isLoading && <Text>Loading...</Text>}
            {isSuccess && data && data.length > 0 && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {data.map((item, index) => (
                  <FavoriteActivityCateCard
                    key={index}
                    ACTIVITY_NAME={item.name}
                    IMG_REF={item.photo_ref[0]}
                    navigation={navigation}
                    place_id={item.place_id}
                    placeItem={item}
                  />
                ))}
              </ScrollView>
            )}
          </View>

          <View style={[Theme.w90, Theme.h13]}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FavioriteScreen;

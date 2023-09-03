/**
 *
 * project name   :  tourism leisure application
 *
 */
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Theme from "../assets/leisure/theme/AxTheme";
import { getChats, sendMessages } from "../service/leisure/LeisureService";

const ChatBotScreen = ({ navigation }) => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [chatArray, setChatArray] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigateSuggest = (msg) => {
    navigation.navigate("Suggest Places", { msg });
  };

  const chatingHandler = async () => {
    if (inputText !== "") {
      setIsLoading(true);
      setIsSuccess(false);
      let temp = chatArray;
      temp.push({ msg: inputText, isUser: true });
      setInputText("");
      console.log("inputText", inputText);
      let chat = {
        msg: inputText,
        isUser: true,
      };
      let reply = await sendMessages(chat);
      console.log("reply ", reply);
      setChatArray(temp);
      fetchChats();
      if (
        reply === "safari" ||
        reply === "hiking" ||
        reply === "whale watching"
      ) {
        if (reply === "whale watching") {
          navigateSuggest("whale+watching");
        } else {
          navigateSuggest(reply);
        }
      }

      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  const fetchChats = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    let chats = await getChats();
    // console.log("chats", chats);
    setChatArray(chats);
    setIsLoading(false);
    setIsSuccess(true);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <SafeAreaView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.containerNew]}>
          <View style={[Theme.w90, Theme.h7, Theme.flexDirRow]}>
            <View style={[Theme.w15, Theme.h100, Theme.justAlign]}>
              <Image
                source={require("../assets/leisure/icon/circle-user.png")}
                resizeMode="contain"
                style={[Theme.w60, Theme.h100]}
              />
            </View>

            <View style={[Theme.w75, Theme.h100, Theme.justifyCenter]}>
              <Text style={[Theme.f20, Theme.black, Theme.mt2]}> Shanika </Text>
            </View>

            <View style={[Theme.w10, Theme.h100]}>
              <TouchableOpacity
                style={[Theme.w100, Theme.h100, Theme.justAlign]}
              >
                <Image
                  source={require("../assets/leisure/icon/menu-dots-vertical.png")}
                  resizeMode="contain"
                  style={[Theme.w90, Theme.h100]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[Theme.w90, Theme.h77]}>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
              {/*-----------------------Chatiing History------------------------------*/}
              {chatArray.map((item, index) => (
                <View key={index}>
                  {item.isUser ? (
                    <View
                      style={[
                        Theme.w100,
                        styles.chatCard,
                        Theme.bgMain1,
                        Theme.borderRadius10,
                      ]}
                    >
                      <Text
                        style={[
                          Theme.f15,
                          Theme.mr2,
                          Theme.fWhite,
                          Theme.txtAlignRight,
                        ]}
                      >
                        {item.msg}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        Theme.w100,
                        styles.chatCard,
                        Theme.bgMain2,
                        Theme.borderRadius10,
                      ]}
                    >
                      <Text style={[Theme.f15, Theme.ml2, Theme.black]}>
                        {item.msg}
                      </Text>
                    </View>
                  )}
                  <View style={[styles.space]} />
                </View>
              ))}
              {isLoading && (
                <Text style={[Theme.f15, Theme.mr2, Theme.fWhite]}>
                  Loading...
                </Text>
              )}
            </ScrollView>
          </View>

          <View
            style={[
              Theme.w90,
              Theme.h7,
              Theme.flexDirRow,
              Theme.bgGray,
              Theme.borderRadius10,
            ]}
          >
            <KeyboardAvoidingView
              style={{
                flex: 1,
              }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={[Theme.w85, Theme.h100]}>
                <TextInput
                  placeholder={"Enter your message here..."}
                  placeholderTextColor={"#000000"}
                  style={[Theme.mt2, Theme.black, Theme.ml2]}
                  value={inputText}
                  onChangeText={setInputText}
                />
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              style={[Theme.w15, Theme.h100, Theme.justAlign]}
              onPress={() => chatingHandler()}
            >
              <Image
                source={require("../assets/leisure/icon/send.png")}
                resizeMode="contain"
                style={[Theme.w90, Theme.h50]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  space: {
    height: 10,
  },
  chatCard: {
    height: 70,
  },
});

export default ChatBotScreen;

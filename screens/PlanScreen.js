/**
 *
 * project name   :  tourism leisure application
 *
 */
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Theme from "../assets/leisure/theme/AxTheme";
import Header from "../components/leisure/Header";
import {
  getActivityAll,
  updateActivity,
} from "../service/leisure/LeisureService";

const PlanScreen = () => {
  const SCREEN_HEIGHT = Dimensions.get("screen").height;
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [eventText, setEventText] = useState("");
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [editActivity, setEditActivity] = useState(null);

  const tableData = [
    {
      time: "9:00 AM - 10:00 AM",
      date_: "27th MARCH",
      activity: "Whales Watching in Mirissa",
    },
    {
      time: "9:00 AM - 10:00 AM",
      date_: "27th MARCH",
      activity: "Whales Watching in Mirissa",
    },
    {
      time: "9:00 AM - 10:00 AM",
      date_: "27th MARCH",
      activity: "Whales Watching in Mirissa",
    },
    {
      time: "9:00 AM - 10:00 AM",
      date_: "27th MARCH",
      activity: "Whales Watching in Mirissa",
    },
    {
      time: "9:00 AM - 10:00 AM",
      date_: "27th MARCH",
      activity: "Whales Watching in Mirissa",
    },
    {
      time: "9:00 AM - 10:00 AM",
      date_: "27th MARCH",
      activity: "Whales Watching in Mirissa",
    },
  ];

  const styles = {
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#000000",
      padding: 10,
      borderBottomWidth: 1,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
    },
    columnHeader: {
      flex: 1,
      fontWeight: "bold",
      borderRightWidth: 1,
      color: "#FFFFFF",
      borderColor: "black",
      padding: 5,
    },
    // row: {
    //   flexDirection: "row",
    // },
    tableRow: {
      borderWidth: 1,
      flexDirection: "row",
      padding: 10,
      borderBottomWidth: 1,
      borderColor: "black",
      borderRadius: 10,
      marginTop: 10,
    },
    columnData: {
      flex: 1,
      borderRightWidth: 1,
      borderColor: "black",
      padding: 5,
      color: "#000000",
    },
    editColumnSize: {
      width: 90,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    tblScroll: {
      width: 352,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: "90%",
      height: "57%",
      margin: 10,
      backgroundColor: "white",
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: "#000000",
    },
    buttonSave: {
      backgroundColor: "#5DD9F1",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    input: {
      height: 40,
      borderWidth: 1,
      width: 300,
      borderRadius: 10,
      padding: 10,
      borderColor: "#5DD9F1",
      margin: 10,
    },
    mt2: {
      marginTop: 20,
    },
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const getColumnValues = (row) => {
    openModal();
    setSelectedTime(row.time);
    setSelectedDate(row.date);
    setEventText(row.name);
    setEditActivity(row);
  };

  const fetchActivity = async () => {
    try {
      const res = await getActivityAll();
      console.log("Successfully Updated");
      setResData(res);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  const updateActivityDetails = async () => {
    try {
      let activityObj = {
        place_id: editActivity.place_id,
        name: editActivity.name,
        address: editActivity.address,
        rating: editActivity.rating,
        photo_ref: editActivity.photo_ref,
        lat: editActivity.lat.toString(),
        lng: editActivity.lng.toString(),
        type: editActivity.type,
        about: editActivity.about,
        time: selectedTime,
        date: selectedDate,
      };
      // console.log("activityObj", activityObj);
      const res = await updateActivity(editActivity._id, activityObj);
      // console.log("res", res);
      setResData(res);
      setIsLoading(false);
      setIsSuccess(true);
      setModalVisible(!modalVisible);
      fetchActivity();
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <SafeAreaView scrollEnabled={false} style={[{ height: SCREEN_HEIGHT }]}>
      <View style={[{ height: SCREEN_HEIGHT }]}>
        <View style={[Theme.container]}>
          <View style={[Theme.w90, Theme.h10, Theme.justAlign]}>
            <TouchableOpacity
              style={[
                Theme.w100,
                Theme.h70,
                Theme.bgCustomBorder,
                Theme.flexDirRow,
              ]}
              onPress={() => navigation.navigate("Faviorite Places")}
            >
              <View style={[Theme.w20, Theme.h100, Theme.justAlign]}>
                <Image
                  source={require("../assets/leisure/icon/plan.png")}
                  style={[Theme.w40, Theme.h45]}
                />
              </View>

              <View style={[Theme.w80, Theme.h100, Theme.justAlign]}>
                <Text style={[Theme.f13, Theme.mainColor3]}>
                  Get The activities from your Favourites
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[Theme.h1]} />

          <View style={[Theme.w90, Theme.h68]}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={[Theme.f20, Theme.mainColor3, Theme.mt2]}>
                    Edit Plane
                  </Text>
                  <View style={[Theme.w100, Theme.h90]}>
                    <View style={styles.row}>
                      <Text style={[Theme.f17, Theme.ml3]}>Time :</Text>
                      <TextInput
                        style={styles.input}
                        value={selectedTime}
                        onChangeText={(text) => setSelectedTime(text)}
                      />
                    </View>
                    <View style={styles.row}>
                      <Text style={[Theme.f17, Theme.ml3]}>Date :</Text>
                      <TextInput
                        style={styles.input}
                        value={selectedDate}
                        onChangeText={(text) => setSelectedDate(text)}
                      />
                    </View>
                    <View style={styles.row}>
                      <Text style={[Theme.f17, Theme.ml3]}>Activity :</Text>
                      <TextInput
                        style={styles.input}
                        value={eventText}
                        editable={false}
                      />
                    </View>
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonSave,
                        styles.mt2,
                        Theme.alignItemCenter,
                      ]}
                      onPress={() => updateActivityDetails()}
                    >
                      <Text style={[Theme.fWhite, Theme.f17]}>Save</Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonClose,
                        styles.mt2,
                        Theme.alignItemCenter,
                      ]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={[Theme.fWhite, Theme.f17]}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
            {isLoading && <Text>Loading...</Text>}

            {isSuccess && resData && resData.length > 0 && (
              <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.tblScroll}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.columnHeader}>Time</Text>
                    <Text style={styles.columnHeader}>Date</Text>
                    <Text style={styles.columnHeader}>Activity</Text>
                    <Text style={styles.columnHeader}>Edit Plan</Text>
                  </View>
                  {resData.map((row, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.columnData}>{row.time}</Text>
                      <Text style={styles.columnData}>{row.date}</Text>
                      <Text style={styles.columnData}>
                        {row.name.slice(0, 20)}...
                      </Text>
                      <TouchableOpacity
                        onPress={() => getColumnValues(row)}
                        style={[styles.editColumnSize]}
                      >
                        <Image
                          source={require("../assets/leisure/icon/edit.png")}
                          style={[Theme.w30, Theme.h55]}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>

          <View style={[Theme.h13]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlanScreen;

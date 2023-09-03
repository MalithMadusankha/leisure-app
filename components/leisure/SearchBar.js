/**
 *
 * project name   :  tourism leisure application
 *
 */
import React from "react";
import { Searchbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Theme from "../../assets/leisure/theme/AxTheme";
import { Image } from "react-native";

const SearchBar = ({ isTyping, navigation }) => {
  const [searchText, setSearchText] = React.useState("");
  const handleSearch = (textS) => {
    setSearchText(textS);
    isTyping(true);
  };

  const handleSearchIcon = (searchText) => {
    navigation.navigate("Where to Go", { searchText });
  };

  return (
    <Searchbar
      placeholder="Where to go?"
      onChangeText={handleSearch}
      placeholderTextColor={"#575757"}
      onIconPress={() => handleSearchIcon(searchText)}
      icon={() => (
        <Image
          source={require("../../assets/leisure/img/search.png")}
          style={{ width: 20, height: 20 }}
        />
      )}
    />
  );
};

export default SearchBar;

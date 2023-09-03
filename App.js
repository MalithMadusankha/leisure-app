import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AllCatergary from "./screens/AllCatergary";
import ActivityCategoryScreen from "./screens/activity-screens/ActivityCategoryScreen";
import ActivityScreen from "./screens/activity-screens/ActivityScreen";
import ChatBotScreen from "./screens/ChatBotScreen";
import SuggestActivityScreen from "./screens/chatbot-screens/SuggestActivityScreen";
import PlanScreen from "./screens/PlanScreen";
import FavioriteScreen from "./screens/faviorite-screens/FavioriteScreen";
import MoreInColomboScreen from "./screens/locations-screens/MoreInColomboScreen";
import NearByScreen from "./screens/locations-screens/NearByScreen";
import WhereToGo from "./screens/locations-screens/WhereToGo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Leisure" component={HomeScreen} />
        <Stack.Screen name="plan" component={AllCatergary} />
        <Stack.Screen name="favorite" component={PlanScreen} />
        <Stack.Screen name="chatbot" component={ChatBotScreen} />
        <Stack.Screen name="allCategory" component={ActivityCategoryScreen} />
        <Stack.Screen name="Leisure Activity" component={ActivityScreen} />
        <Stack.Screen name="Suggest Places" component={SuggestActivityScreen} />
        <Stack.Screen name="Faviorite Places" component={FavioriteScreen} />
        <Stack.Screen name="More in Colombo" component={MoreInColomboScreen} />
        <Stack.Screen name="Nearby" component={NearByScreen} />
        <Stack.Screen name="Where to Go" component={WhereToGo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

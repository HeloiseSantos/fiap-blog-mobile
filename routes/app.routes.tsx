import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/app/screens/home";
import EditScreen from "@/app/screens/editscreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Home: undefined;
  EditScreen: { postId: string };
};

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
    </Stack.Navigator>
  );
}

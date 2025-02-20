import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/app/screens/home";
import EditScreen from "@/app/screens/editscreen";
import CreatePostScreen from "@/app/screens/createpost";
import TeacherUsersScreen from "@/app/screens/teacherusers";

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootStackParamList = {
  Home: undefined;
  EditScreen: { postId: string };
  CreatePostScreen: undefined;
  TeacherUsersScreen: undefined;
};

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <Stack.Screen name="TeacherUsersScreen" component={TeacherUsersScreen} />
    </Stack.Navigator>
  );
}

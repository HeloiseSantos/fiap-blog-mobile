import { useAuth0 } from "react-native-auth0";
import { Button, StyleSheet } from "react-native";

export default function LogoutButton() {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession();
      console.log("Logout successful");
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  return <Button onPress={onPress} title="Log out" />;
}

const styles = StyleSheet.create({
  loginButton: {
    width: 100,
    height: 40,
  },
});

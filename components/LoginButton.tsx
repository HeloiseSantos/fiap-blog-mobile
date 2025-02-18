import { useAuth0 } from "react-native-auth0";
import { Button, StyleSheet } from "react-native";

export default function LoginButton() {
    const { authorize } = useAuth0();

    const onPress = async () => {
        console.log("Login button pressed");
        try {
            await authorize();
            console.log("Authorization successful")
        } catch (e) {
            console.error("Authorization error", e);
        }
    };

    return <Button onPress={onPress} title="Log in" />
}

const styles = StyleSheet.create({
    loginButton: {
        width: 100,
        height: 40,
    },
});
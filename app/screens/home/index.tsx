import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth0 } from "react-native-auth0";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function Home() {
  const { user, isLoading } = useAuth0();

  useEffect(() => {
    console.log("User state changed", user);
  }, [user]);

  useEffect(() => {
    console.log("Loading state changed", isLoading);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <>
        <View style={styles.loggedInContainer}>
          <Text style={styles.title}>Blog Educacional</Text>
          <View style={styles.authButtonContainer}>
            {user ? <LogoutButton /> : <LoginButton />}
          </View>
        </View>
        {user ? (
          <Text style={styles.userText}>Logado como {user.nickname}</Text>
        ) : null}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  loggedInContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    position: "relative",
  },
  title: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  userText: {
    paddingTop: 10,
    marginRight: 10,
  },
  authButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

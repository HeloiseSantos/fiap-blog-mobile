import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAuth0 } from "react-native-auth0";
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from "@react-navigation/native";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import PostCard from "@/components/PostCard";

interface Post {
  _id: string;
  title: string;
  author: string;
  description: string;
  createDate: string;
  updateDate: string;
}

type RootStackParamList = {
  Home: undefined;
  EditScreen: { postId: string };
};

export default function Home() {
  const { user, isLoading } = useAuth0();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("User state changed", user);
  }, [user]);

  useEffect(() => {
    console.log("Loading state changed", isLoading);
  }, [isLoading]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://fiap-blog-backend-latest.onrender.com/posts"
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (id: string) => {
    navigation.navigate("EditScreen", { postId: id });
  };

  const onDelete = (id: string) => {
    // ToDo
  };

  if (isLoading || loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Blog Educacional</Text>
        <View style={styles.authButtonContainer}>
          {user ? <LogoutButton /> : <LoginButton />}
        </View>
      </View>
      {user ? (
        <Text style={styles.userText}>Logado como {user.nickname}</Text>
      ) : null}

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            _id={item._id}
            author={item.author}
            title={item.title}
            description={item.description}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  header: {
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
    paddingBottom: 10,
    marginRight: 10,
  },
  authButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
  },
});

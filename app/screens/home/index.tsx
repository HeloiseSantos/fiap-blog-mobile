import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
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
  CreatePostScreen: undefined;
  TeacherUsersScreen: undefined;
};

export default function Home() {
  const { user, isLoading } = useAuth0();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("User state changed", user);
  }, [user]);

  useEffect(() => {
    console.log("Loading state changed", isLoading);
  }, [isLoading]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

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

  const handleEdit = (id: string) => {
    navigation.navigate("EditScreen", { postId: id });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja excluir este post?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => deletePost(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const deletePost = async (id: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fiap-blog-backend-latest.onrender.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      alert("Post excluído com sucesso!");

      fetchPosts();
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const endpoint = searchTerm
        ? `https://fiap-blog-backend-latest.onrender.com/posts/search?q=${searchTerm}`
        : `https://fiap-blog-backend-latest.onrender.com/posts`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const handleCreatePost = () => {
    navigation.navigate("CreatePostScreen");
  };

  const handleSettings = () => {
    navigation.navigate("TeacherUsersScreen");
  };

  if (isLoading || loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Blog Educacional</Text>
        <View style={styles.authButtonContainer}>
          <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          {user ? <LogoutButton /> : <LoginButton />}
        </View>
      </View>
      {user ? (
        <Text style={styles.userText}>Logado como {user.nickname}</Text>
      ) : null}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search posts..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreatePost}
        >
          <Text style={styles.createButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            _id={item._id}
            author={item.author}
            title={item.title}
            description={item.description}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
    flexDirection: "row",
    position: "absolute",
    top: 10,
    right: 10,
  },
  settingsButton: {
    width: 70,
    height: 40,
    marginRight: 10,
    backgroundColor: "#6c757d",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  createButton: {
    marginLeft: 10,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
  },
});

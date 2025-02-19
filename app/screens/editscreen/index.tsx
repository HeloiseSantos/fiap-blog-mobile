import LoadingIndicator from "@/components/LoadingIndicator";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";

type RootStackParamList = {
  EditScreen: { postId: string };
};

type EditScreenRouteProp = RouteProp<RootStackParamList, "EditScreen">;

export default function EditScreen() {
  const route = useRoute<EditScreenRouteProp>();
  const { postId } = route.params;
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://fiap-blog-backend-latest.onrender.com/posts/${postId}`
        );

        const post = await response.json();

        setTitle(post.title);
        setAuthor(post.author);
        setDescription(post.description);
        setCreateDate(post.createDate);
        setUpdateDate(post.updateDate);
      } catch (error) {
        console.error("Erro ao recuperar o post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const formatCurrentDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    const currentDate = new Date().toISOString();
    console.log("currentDate: ", currentDate);
    const formattedDate = formatCurrentDate(currentDate);
    console.log("formattedDate: ", formattedDate);
    setUpdateDate(formattedDate);
    console.log("updateDate onEdit: ", updateDate);
    putPost(postId, formattedDate);
  };

  const putPost = async (postId: string, date: string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://fiap-blog-backend-latest.onrender.com/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, updateDate: date }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao editar o post");
      }

      alert("Post editado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar o post:", error);
    } finally {
      navigation.goBack();
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Create Date</Text>
          <TextInput
            style={styles.input}
            value={formatDate(createDate)}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Update Date</Text>
          <TextInput
            style={styles.input}
            value={formatDate(updateDate)}
            editable={false}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Cancel" onPress={handleCancel} color="#6c757d" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Edit" onPress={handleEdit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

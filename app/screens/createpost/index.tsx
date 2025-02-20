import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function CreatePostScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentDate = getCurrentDate();
    setDate(currentDate);
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleCreate = async () => {
    try {
      setLoading(true);

      const createDate = date;
      const updateDate = date;

      const response = await fetch(
        "https://fiap-blog-backend-latest.onrender.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            description,
            createDate,
            updateDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      alert("Post cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar post:", error);
    } finally {
      setLoading(false);
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
          <TextInput style={styles.input} value={date} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Update Date</Text>
          <TextInput style={styles.input} value={date} editable={false} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Cancel" onPress={handleCancel} color="#6c757d" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Create" onPress={handleCreate} />
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

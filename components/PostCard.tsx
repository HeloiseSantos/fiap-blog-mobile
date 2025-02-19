import { View, StyleSheet, Text, Button } from "react-native";

interface PostProps {
  _id: string;
  title: string;
  author: string;
  description: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PostCard({
  _id,
  title,
  author,
  description,
  onEdit,
  onDelete,
}: PostProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>by {author}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <Button color="#6c757d" title="Edit" onPress={() => onEdit(_id)} />
        <Button color="#dc3545" title="Delete" onPress={() => onDelete(_id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    width: 350,
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

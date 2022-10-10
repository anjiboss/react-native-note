import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import NoteCard from "../components/NoteCard";

import { View } from "../components/Themed";
import useNoteApp from "../hooks/useNoteApp";
import { INote, RootTabScreenProps } from "../types";

export default function NoteApp({}: RootTabScreenProps<"NoteApp">) {
  const [notes, setNotes] = useState<INote[]>([]);
  const { setNoteFromStorage, add, update, remove } = useNoteApp(setNotes);

  useEffect(() => {
    setNoteFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Add new note"
        onPress={() => {
          add("some name", "Some text");
        }}
      />

      <FlatList
        keyExtractor={(item) => String(item.id)}
        data={notes}
        renderItem={(item) => <NoteCard note={item.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

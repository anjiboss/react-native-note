import React from "react";
import { INote } from "../types";
import { Text, View } from "./Themed";

interface NoteCardProps {
  children?: React.ReactNode;
  note: INote;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <View>
      <Text>{note.name}</Text>
    </View>
  );
};
export default NoteCard;

import { INote } from "../types";
import * as SecureStore from "expo-secure-store";
const KEY = "note";

/**
 * Get All Note from local storage
 */
const getLocalStorageNote = async (): Promise<INote[]> => {
  const notes = await SecureStore.getItemAsync(KEY);

  if (!notes || notes === "") {
    return [];
  }

  try {
    const jsonNotes = JSON.parse(notes);
    return jsonNotes;
  } catch (error) {
    return [
      {
        id: 99999999,
        name: "Error Occurred",
        addedAt: new Date(),
        updateAt: new Date(),
        text: "String text: " + notes,
      },
    ];
  }
};

/**
 * Add new note to local storage
 */
const storeLocalStorageNote = async (name: string, text: string) => {
  const currentNotes = await getLocalStorageNote();
  try {
    await SecureStore.setItemAsync(
      KEY,
      JSON.stringify([
        ...currentNotes,
        {
          id: currentNotes.length + 1,
          addedAt: new Date(),
          updateAt: new Date(),
          name,
          text,
        } as INote,
      ])
    );
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * update note to local storage
 */
const updateLocalStorageNote = async (note: INote) => {
  const currentNotes = await getLocalStorageNote();
  if (currentNotes.length === 0 || currentNotes[0].id === 99999999) {
    return [false, "Current note empty or current stored note error"];
  }

  let isUpdated = false;
  let msg = "Update failed, note not found!";

  for (let i = 0; i < currentNotes.length; i++) {
    if (currentNotes[i].id === note.id) {
      currentNotes[i] = { ...note, updateAt: new Date() };
      isUpdated = true;
      msg = "Updated!";
      break;
    }
  }

  try {
    await SecureStore.setItemAsync(KEY, JSON.stringify(currentNotes));
    return [isUpdated, msg];
  } catch (error) {
    return [false, "SecureStore cannot store item"];
  }
};

/**
 * Remove a note from storage
 * @param note
 */
const removeLocalStorageNote = async (note: INote) => {
  const currentNotes = await getLocalStorageNote();
  const deletedNotes = currentNotes.filter((_note) => _note.id !== note.id);

  if (deletedNotes.length >= currentNotes.length) {
    return [false, "Note not found"];
  }
  try {
    await SecureStore.setItemAsync(KEY, JSON.stringify(deletedNotes));
    return [true, "Deleted"];
  } catch (error) {
    return [false, "SecureStore cannot store item"];
  }
};

export {
  getLocalStorageNote,
  storeLocalStorageNote,
  removeLocalStorageNote,
  updateLocalStorageNote,
};

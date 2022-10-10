import React from "react";
import { INote } from "../types";
import {
  getLocalStorageNote,
  removeLocalStorageNote,
  storeLocalStorageNote,
  updateLocalStorageNote,
} from "../utils/localStorageHandler";

export default function useNoteApp(
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>
) {
  const setNoteFromStorage = async () => {
    const notes = await getLocalStorageNote();
    setNotes(notes);
  };

  /**
   * Add note to state
   */
  const add = (name: string, text: string) => {
    storeLocalStorageNote(name, text).then((result) => {
      if (result) {
        setNoteFromStorage();
      }
    });
  };

  /**
   * Add note to state
   */
  const update = (newNote: INote) => {
    updateLocalStorageNote(newNote).then(([result, _]) => {
      if (result) {
        setNoteFromStorage();
      }
    });
  };

  /**
   * Remove Note from state
   */
  const remove = (removeNote: INote) => {
    removeLocalStorageNote(removeNote).then(([result, __]) => {
      if (result) {
        setNoteFromStorage();
      }
    });
  };

  return {
    add,
    remove,
    update,
    setNoteFromStorage,
  };
}

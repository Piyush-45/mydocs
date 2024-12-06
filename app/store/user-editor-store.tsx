import { create } from "zustand";
import { Editor } from "@tiptap/react";

interface EditorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    editor: null, // Initial state
    setEditor: (editor) => set({ editor }), // Action to update the editor
}));

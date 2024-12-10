import { Editor } from "@tiptap/react";

export const onDownload = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url); // Clean up after download
};

// Save as JSON
export const onSaveJSON = (editor: Editor | null) => {
  if (!editor) return;
  const content = editor.getJSON();
  const blob = new Blob([JSON.stringify(content, null, 2)], {
    type: "application/json",
  });
  onDownload(blob, "document.json");
};

// Save as HTML
export const onSaveHTML = (editor: Editor | null) => {
  if (!editor) return;
  const content = editor.getHTML();
  const blob = new Blob([content], { type: "text/html" });
  onDownload(blob, "document.html");
};

// Save as Text
export const onSaveText = (editor: Editor | null) => {
  if (!editor) return;
  const content = editor.getText();
  const blob = new Blob([content], { type: "text/plain" });
  onDownload(blob, "document.txt");
};

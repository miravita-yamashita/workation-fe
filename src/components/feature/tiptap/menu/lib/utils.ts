import { Editor } from "@tiptap/react";

export const setLink = (editor: Editor) => {
  const previousUrl = editor.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  try {
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  } catch (e: unknown) {
    alert((e as Error).message);
  }
};

export const addImage = (editor: Editor) => {
  const url = window.prompt("URL");
  if (editor) {
    if (url) {
      editor.chain().focus().setImage({ src: url, alt: "Sample Image" }).run();
    }
  }
};

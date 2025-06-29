import { mergeAttributes, Node } from "@tiptap/core";

export interface BoxViewOptions {
  HTMLAttributes: {
    [key: string]: string;
  };
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    BoxNode: {
      /**
       * Set a customDiv node
       */
      setBorderedBox: (
        attributes?: Partial<BoxViewOptions["HTMLAttributes"]>,
      ) => ReturnType;
    };
  }
}

export const BoxNode = Node.create<BoxViewOptions>({
  name: "boxNode",

  group: "block",

  content: "block+",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "box-view",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (node) => {
          const dom = node as HTMLElement;
          return dom.classList.contains("box-view") ? {} : false;
        },
      },
    ];
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => {
        return this.editor.commands.insertContent({ type: "paragraph" });
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setBorderedBox:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
            content: [{ type: "paragraph" }],
          });
        },
    };
  },
});

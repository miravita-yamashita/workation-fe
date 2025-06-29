import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { SplitView, SplitViewItem } from "./split-view";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    SplitViewComponent: { 
      /**
       * create a card node
       */
      createSplitView: () => ReturnType;
    };
  }
}

export const SplitViewNode = Node.create({
  name: "splitViewNode",

  group: "block",

  content: "block+",

  parseHTML() {
    return [
      {
        tag: "split-view",
      },
    ];
  },

  addCommands() {
    return {
      createSplitView:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              { type: "splitViewItemNode" },
              { type: "splitViewItemNode" },
            ],
          });
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["split-view", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SplitView);
  },
});

export const SplitViewItemNode = Node.create({
  name: "splitViewItemNode",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "split-view-item",
      },
    ];
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        return this.editor.commands.selectNodeForward();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["split-view-item", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SplitViewItem);
  },
});

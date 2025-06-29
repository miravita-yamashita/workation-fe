import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

export const SplitView = () => {
  return (
    <NodeViewWrapper className="">
      <NodeViewContent className="split-view"></NodeViewContent>
    </NodeViewWrapper>
  );
};

export const SplitViewItem = () => {
  return (
    <NodeViewWrapper>
      <NodeViewContent className="split-view__item" />
    </NodeViewWrapper>
  );
};

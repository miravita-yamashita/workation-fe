import { Table } from "@tiptap/extension-table";
import { mergeAttributes } from "@tiptap/core";

export const CustomTable = Table.extend({
  addNodeView() {
    return ({}) => {
      // table-pointer container
      const tablePointer = document.createElement("div");
      tablePointer.classList.add("table-pointer");

      // responsive div container
      const dom = document.createElement("div");
      dom.classList.add("table-wrapper");

      // the table
      const table = document.createElement("table");
      dom.append(table);

      const tbody = table.appendChild(document.createElement("tbody"));
      tablePointer.append(dom);

      return {
        dom: tablePointer,
        contentDOM: tbody,
      };
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "table-pointer" },
      [
        "div",
        { class: "table-wrapper" },
        [
          "table",
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          ["tbody", 0],
        ],
      ],
    ];
  },
});

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Bold } from "@tiptap/extension-bold";
import { Italic } from "@tiptap/extension-italic";
import { Underline } from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Image } from "@tiptap/extension-image";
import { SplitViewNode, SplitViewItemNode } from "./extension/split-view";
import { ToolbarComposite } from "./menu";
import Strike from "@tiptap/extension-strike";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "./extension/font-size";
import Heading from "@tiptap/extension-heading";
import { BoxNode } from "./extension/box";
import { CustomTable } from "./extension/table/custom-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

export const Tiptap = ({
  onChangeFormHook,
  contentHTML,
}: {
  onChangeFormHook?: (html: string) => void;
  contentHTML?: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        blockquote: false,
        paragraph: false,
        bold: false,
        italic: false,
        listItem: false,
        bulletList: false,
        orderedList: false,
        strike: false,
        heading: false,
      }),
      Paragraph,
      Bold,
      Italic,
      Underline,
      ListItem,
      BulletList.configure(),
      OrderedList.configure(),
      Blockquote.configure({
        HTMLAttributes: {
          class:
            "border-l-[.125rem] border-pink-200 bg-shade-50 py-2.5 px-[1.375rem]",
        },
      }),
      Image.configure({
        inline: true, //this will allow the image to be wrapped in paragraph be contained on a div
        HTMLAttributes: {
          class: "object-cover",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Strike,
      TextStyle,
      Color,
      Heading,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme,
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      CustomTable.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      // Custom extensions
      SplitViewNode,
      SplitViewItemNode,
      FontSize,
      BoxNode,
    ],
    immediatelyRender: false,
    content: contentHTML || "",
    enablePasteRules: false,
    onBlur: ({ editor }) => {
      if (onChangeFormHook) {
        onChangeFormHook(editor.getHTML());
      }
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="relative rounded-[.5rem] border border-shade-550">
      <ToolbarComposite
        editor={editor}
        className="sticky top-0 z-10 border-t bg-white"
      />
      <EditorContent
        editor={editor}
        className="tiptap tiptap--editor max-h-[43.75rem] overflow-y-auto border-t [&>div]:p-5"
      />
    </div>
  );
};

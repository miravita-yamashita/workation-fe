"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Toolbar,
  ToolbarFontSize,
  ToolbarIcon,
  ToolbarInsertImage,
  ToolbarTypography,
} from "./toolbar";

import { Button } from "@/components/ui/button";
import IconToolbarBold from "@public/icon-toolbar-bold.svg";
import IconToolbarItalic from "@public/icon-toolbar-italic.svg";
import IconToolbarBulletList from "@public/icon-toolbar-bullet-list.svg";
import IconToolbarBulletNumbered from "@public/icon-toolbar-bullet-numbered.svg";
import IconToolbarQuote from "@public/icon-toolbar-quote.svg";
import IconToolbarAlignLeft from "@public/icon-toolbar-align-left.svg";
import IconToolbarAlignCenter from "@public/icon-toolbar-align-center.svg";
import IconToolbarAlignNormal from "@public/icon-toolbar-align-normal.svg";
import IconToolbarLinkChain from "@public/icon-toolbar-link-chain.svg";
import IconToolbarStrikeThrough from "@public/icon-toolbar-strike-through.svg";
import IconToolbarUnderline from "@public/icon-toolbar-underline.svg";
import IconToolbarColor from "@public/icon-toolbar-color.svg";
import IconToolbarUndo from "@public/icon-toolbar-undo.svg";
import IconToolbarRedo from "@public/icon-toolbar-redo.svg";
import IconToolbarCamera from "@public/icon-toolbar-camera.svg";
import IconToolbarTable from "@public/icon-toolbar-table.svg";
import { Editor } from "@tiptap/react";
import { setLink } from "./lib/utils";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  AdminSelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { ColumnContainer } from "@components/feature/common";
import { BetweenVerticalStart, Square } from "lucide-react";
import { openMediaUploadModalAsync } from "@components/feature/media-upload/gallery";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

export const ToolbarComposite = ({
  className,
  editor,
}: CommonProps & {
  editor: Editor;
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const DEFAULT_FONT_LABEL = "デフォルト";

  return (
    <Toolbar className={cn("", className)}>
      <ColumnContainer className="mb-2.5 gap-2.5">
        <ToolbarInsertImage>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            className="inline-flex items-center gap-2 rounded-[.1875rem] border border-blue-350 bg-white px-2.5 py-2 text-xs font-bold text-blue-350"
            onClick={async () => {
              // Open Media Library and get the selected media
              const data = await openMediaUploadModalAsync();

              if (data) {
                const { url, custom_attr } = data;
                editor
                  .chain()
                  .focus()
                  .setImage({ src: url, alt: custom_attr?.alt ?? "no caption" })
                  .run();
              }
            }}
          >
            <ToolbarIcon
              imageSource={IconToolbarCamera.src}
              imageAltText="icon toolbar camera"
            />
            <span>メディアを追加</span>
          </Button>
        </ToolbarInsertImage>

        <section className="flex min-w-0 flex-wrap items-center gap-0">
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => {
              editor.commands.createSplitView();
            }}
          >
            <BetweenVerticalStart />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => {
              editor.commands.setBorderedBox();
            }}
          >
            <Square />
          </Button>
        </section>
      </ColumnContainer>

      <section className="flex min-w-0 flex-wrap items-center gap-4">
        <section className="flex min-w-0 flex-wrap gap-4">
          <ToolbarTypography>
            <Select
              onValueChange={(value) => {
                switch (value) {
                  case "h1":
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                    break;
                  case "h2":
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    break;
                  case "h3":
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                    break;
                  case "h4":
                    editor.chain().focus().toggleHeading({ level: 4 }).run();
                    break;
                  case "h5":
                    editor.chain().focus().toggleHeading({ level: 5 }).run();
                    break;
                  case "h6":
                    editor.chain().focus().toggleHeading({ level: 6 }).run();
                    break;
                  default:
                    editor.chain().focus().setParagraph().run();
                    break;
                }
              }}
              defaultValue="paragraph"
              value={
                editor.getAttributes("heading").level
                  ? `h${editor.getAttributes("heading").level}`
                  : "paragraph"
              }
            >
              <AdminSelectTrigger className="w-[7.5rem] rounded-[.1875rem] border-[.0625rem] bg-white px-2.5 py-2">
                {editor.getAttributes("heading").level
                  ? `見出し ${editor.getAttributes("heading").level}`
                  : "段落"}
              </AdminSelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="paragraph">段落</SelectItem>
                  <SelectItem value="h1">見出し1</SelectItem>
                  <SelectItem value="h2">見出し2</SelectItem>
                  <SelectItem value="h3">見出し3</SelectItem>
                  <SelectItem value="h4">見出し4</SelectItem>
                  <SelectItem value="h5">見出し5</SelectItem>
                  <SelectItem value="h6">見出し6</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ToolbarTypography>
          <ToolbarFontSize>
            <Select
              onValueChange={(value) => {
                editor.chain().focus().setFontSize(`${value}pt`).run();
              }}
              value={
                editor.getAttributes("textStyle").fontSize
                  ? `${editor.getAttributes("textStyle").fontSize.replace("pt", "")}`
                  : DEFAULT_FONT_LABEL
              }
            >
              <AdminSelectTrigger className="w-[6.25rem] rounded-[.1875rem] border-[.0625rem] bg-white px-2.5 py-2">
                {editor.getAttributes("textStyle").fontSize
                  ? editor.getAttributes("textStyle").fontSize === "pt"
                    ? DEFAULT_FONT_LABEL
                    : editor.getAttributes("textStyle").fontSize
                  : DEFAULT_FONT_LABEL}
              </AdminSelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: 25 }, (_, i) => i + 16).map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}pt
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </ToolbarFontSize>
        </section>
        <section className="flex min-w-0 flex-wrap items-center gap-4">
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn("", {
              "bg-shade-250": editor.isActive("bold"),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarBold.src}
              imageAltText="icon toolbar bold"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn("", {
              "bg-shade-250": editor.isActive("italic"),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarItalic.src}
              imageAltText="icon toolbar italic"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn("", {
              "bg-shade-250": editor.isActive("bulletList"),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarBulletList.src}
              imageAltText="icon toolbar bullet list"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn("", {
              "bg-shade-250": editor.isActive("orderedList"),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarBulletNumbered.src}
              imageAltText="icon toolbar bullet numbered"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn("", {
              "bg-shade-250": editor.isActive("blockquote"),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarQuote.src}
              imageAltText="icon toolbar quote"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={cn("", {
              "bg-shade-250": editor.isActive({ textAlign: "left" }),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarAlignLeft.src}
              imageAltText="icon toolbar align left"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={cn("", {
              "bg-shade-250": editor.isActive({ textAlign: "center" }),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarAlignCenter.src}
              imageAltText="icon toolbar align center"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={cn("", {
              "bg-shade-250": editor.isActive({ textAlign: "justify" }),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarAlignNormal.src}
              imageAltText="icon toolbar align normal"
            />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="toolbar" className="max-h-[1.5rem]">
                <ToolbarIcon
                  imageSource={IconToolbarTable.src}
                  imageAltText="icon toolbar table"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[6.5rem] rounded-none border border-black p-2.5">
              <div className="flex flex-col gap-2.5">
                <Button
                  type="button"
                  variant="toolbar-popover"
                  className="justify-start"
                  onClick={() => {
                    const isActive = editor.isActive("table");
                    if (!isActive) {
                      editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 2, cols: 2, withHeaderRow: false })
                        .run();
                    } else {
                      editor.chain().focus().deleteTable().run();
                    }
                  }}
                >
                  {editor.isActive("table")
                    ? "テーブルの削除"
                    : "テーブルの作成"}
                </Button>
                <Button
                  type="button"
                  variant="toolbar-popover"
                  onClick={() => {
                    editor.chain().focus().addRowBefore().run();
                  }}
                >
                  行を上に挿入
                </Button>
                <Button
                  type="button"
                  variant="toolbar-popover"
                  className="justify-start"
                  onClick={() => {
                    editor.chain().focus().addRowAfter().run();
                  }}
                >
                  行を下に挿入
                </Button>
                <Button
                  type="button"
                  variant="toolbar-popover"
                  className="justify-start"
                  onClick={() => {
                    editor.chain().focus().deleteRow().run();
                  }}
                >
                  行を削除
                </Button>
                <Button
                  type="button"
                  variant="toolbar-popover"
                  className="justify-start"
                  onClick={() => {
                    editor.chain().focus().addColumnBefore().run();
                  }}
                >
                  列を左に挿入
                </Button>
                <Button
                  type="button"
                  variant="toolbar-popover"
                  className="justify-start"
                  onClick={() => {
                    editor.chain().focus().addColumnAfter().run();
                  }}
                >
                  列を右に挿入
                </Button>
                <Button
                  type="button"
                  variant="toolbar-popover"
                  className="justify-start"
                  onClick={() => {
                    editor.chain().focus().deleteColumn().run();
                  }}
                >
                  列を削除
                </Button>

                <Button
                  type="button"
                  variant="toolbar-popover"
                  className="justify-start"
                  onClick={() => {
                    editor.chain().focus().toggleHeaderRow().run();
                  }}
                  asChild
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={editor.isActive("tableHeader")}
                      className={cn("", {
                        "data-[state=checked]:bg-black":
                          editor.isActive("tableHeader"),
                      })}
                    />
                    ヘッダー
                  </div>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => {
              const isActive = editor.isActive("link");

              if (!isActive) {
                setLink(editor);
              }

              if (isActive) {
                editor.chain().focus().unsetLink().run();
              }
            }}
            className={cn("", {
              "bg-shade-250": editor.isActive("link"),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarLinkChain.src}
              imageAltText="icon toolbar link chain"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn("", {
              "bg-shade-250": editor.isActive("strike"),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarStrikeThrough.src}
              imageAltText="icon toolbar strike through"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn("", {
              "bg-shade-250": editor.isActive("underline"),
            })}
          >
            <ToolbarIcon
              imageSource={IconToolbarUnderline.src}
              imageAltText="icon toolbar underline"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => colorInputRef.current?.click()}
          >
            <div className="relative flex h-3 w-3 flex-col justify-center gap-0.5">
              <ToolbarIcon
                imageSource={IconToolbarColor.src}
                imageAltText="icon toolbar color"
                className="h-2 w-2"
              />
              <Input
                ref={colorInputRef}
                className="absolute bottom-0 h-0 p-0 leading-none opacity-0"
                type="color"
                onInput={(event) =>
                  editor
                    .chain()
                    .focus()
                    .setColor((event.target as HTMLInputElement).value)
                    .run()
                }
                value={editor.getAttributes("textStyle").color || "#000000"}
                data-testid="setColor"
              />
              <div
                className="h-0.5 w-full"
                style={{
                  backgroundColor: colorInputRef.current?.value,
                }}
              ></div>
            </div>
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <ToolbarIcon
              imageSource={IconToolbarUndo.src}
              imageAltText="icon toolbar undo"
            />
          </Button>
          <Button
            type="button"
            variant="toolbar"
            size="auto"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <ToolbarIcon
              imageSource={IconToolbarRedo.src}
              imageAltText="icon toolbar redo"
            />
          </Button>
        </section>
      </section>
    </Toolbar>
  );
};

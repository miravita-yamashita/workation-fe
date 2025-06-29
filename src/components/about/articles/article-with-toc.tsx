"use client";

import useSmoothScroll from "@/hooks/use-smoothscroll";
import { cn } from "@/lib/utils";
import IconCaret from "@public/icon-caret.svg";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { RecommendedArticleType } from "../lib";
import { ArticleRelated } from "./article-post";

type ArticleWithTOCProps = {
  richTextContent: string;
  relatedArticles: RecommendedArticleType[];
  onlyTOC?: boolean;
};

type TOCItem = {
  id: string;
  text: string;
  level: number;
  children: TOCItem[];
};

const ArticleWithTOC = ({
  richTextContent,
  relatedArticles,
  onlyTOC = false,
}: ArticleWithTOCProps) => {
  const [contentBeforeFirstParagraph, setContentBeforeFirstParagraph] =
    useState<string>("");
  const [contentAfterFirstParagraph, setContentAfterFirstParagraph] =
    useState<string>("");
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {},
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useSmoothScroll();

  // Generate a consistent unique ID based on the text content
  const generateUniqueId = useCallback((text: string): string => {
    // Create a TextEncoder instance to handle UTF-8 encoding
    const encoder = new TextEncoder();
    const encodedText = encoder.encode(text); // Encode the text to a byte array

    // Convert the byte array to Base64
    let base64Text = "";
    for (let i = 0; i < encodedText.length; i++) {
      base64Text += String.fromCharCode(encodedText[i]);
    }
    return `toc-${window.btoa(base64Text)}`; // Use btoa after converting to string
  }, []);

  // Generate a unique key for React components
  const generateUniqueKey = useCallback(
    (text: string, index: number): string => {
      return `${generateUniqueId(text)}-${index}`;
    },
    [generateUniqueId],
  );

  const addIdToHeadings = useCallback(
    (content: string): string => {
      return content.replace(
        /<h([1-6])([^>]*)>(.*?)<\/h\1>/g,
        (match, p1, p2, p3) => {
          const text = p3.trim();
          const id = generateUniqueId(text);

          // Handle existing attributes
          const existingAttributes = p2 ? p2.trim() : "";
          // Add id attribute, ensuring proper spacing
          const attributes = existingAttributes
            ? `${existingAttributes} id="${id}"`
            : `id="${id}"`;

          return `<h${p1} ${attributes}>${p3}</h${p1}>`;
        },
      );
    },
    [generateUniqueId],
  );

  const toggleSection = (id: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderTOC = (items: TOCItem[], parentNumber = "", parentIndex = 0) => (
    <ul className="article-toc-list article-toc-items space-y-1 pl-4">
      {items.map((item, index) => {
        const currentNumber = parentNumber
          ? `${parentNumber}.${index + 1}`
          : `${index + 1}`;
        const isOpen = openSections[item.id] || false;
        // Generate a unique key for React
        const uniqueKey = generateUniqueKey(item.text, parentIndex + index);

        return (
          <li
            key={uniqueKey}
            className={cn("article-toc-item", isOpen && "article-item-open")}
          >
            {item.level === 2 ? (
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => toggleSection(item.id)}
              >
                <a href={`#${item.id}`} className="hover:underline">
                  <span className="inline-block pr-3">{currentNumber}</span>{" "}
                  {item.text}
                </a>
                {item.children.length > 0 && (
                  <span>
                    {isOpen ? (
                      <div className="accordion-trigger-icon relative h-2.5 w-2.5 shrink-0 transition-transform duration-200">
                        <Image
                          src={IconCaret}
                          alt="accordion icon"
                          className="rotate-[270deg]"
                          fill
                          sizes="100%"
                        />
                      </div>
                    ) : (
                      <div className="accordion-trigger-icon relative h-2.5 w-2.5 shrink-0 transition-transform duration-200">
                        <Image
                          src={IconCaret}
                          alt="accordion icon"
                          className="rotate-90"
                          fill
                          sizes="100%"
                        />
                      </div>
                    )}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <a
                  href={`#${item.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {currentNumber} {item.text}
                </a>
              </div>
            )}

            {item.children.length > 0 && item.level === 2 && isOpen && (
              <div className="pl-[.6rem]">
                {renderTOC(
                  item.children,
                  currentNumber,
                  parentIndex + index + 1,
                )}
              </div>
            )}

            {item.children.length > 0 && item.level > 2 && (
              <div className="pl-4">
                {renderTOC(
                  item.children,
                  currentNumber,
                  parentIndex + index + 1,
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parser = new DOMParser();
      // The original code for Table on Contents expects an empty paragraph at the beginning of rich text
      // So, we are adding an empty paragraph at the beginning so it would be easier for the admin and prevent layout issues.
      const richTextContentManipulated = "<p></p>" + richTextContent;
      const doc = parser.parseFromString(
        richTextContentManipulated,
        "text/html",
      );

      const firstParagraph = doc.querySelector("p:first-of-type");

      if (firstParagraph) {
        // Note: This code, contentBefore will get the direct second p tag of the article and place it above the Recommended Article fields set
        const contentBefore = richTextContentManipulated.slice(
          0,
          richTextContentManipulated.indexOf(firstParagraph.outerHTML) +
            firstParagraph.outerHTML.length,
        );
        const contentAfter = richTextContentManipulated.slice(
          contentBefore.length,
        );

        // Process the content to add IDs to headings
        const processedContentBefore = addIdToHeadings(contentBefore);
        const processedContentAfter = addIdToHeadings(contentAfter);

        setContentBeforeFirstParagraph(processedContentBefore);
        setContentAfterFirstParagraph(processedContentAfter);

        // Update the doc with the processed content to get the correct IDs
        const processedDoc = parser.parseFromString(
          processedContentBefore + processedContentAfter,
          "text/html",
        );

        const headings = Array.from(
          processedDoc.querySelectorAll("h2, h3"),
        ).map((heading) => {
          const text = heading.textContent?.trim() || "Untitled";
          const id = heading.id || generateUniqueId(text);

          return {
            id,
            text,
            level: parseInt(heading.tagName[1]),
          };
        });

        const nestedTOC: TOCItem[] = [];
        const stack: TOCItem[] = [];

        headings.forEach((heading) => {
          const item: TOCItem = {
            ...heading,
            children: [],
          };

          while (
            stack.length &&
            stack[stack.length - 1].level >= heading.level
          ) {
            stack.pop();
          }
          if (stack.length) {
            stack[stack.length - 1].children.push(item);
          } else {
            nestedTOC.push(item);
          }
          stack.push(item);
        });

        setTocItems(nestedTOC);
        let firstOpenSectionId: string | null = null;

        nestedTOC.forEach((item) => {
          if (!firstOpenSectionId && item.children.length > 0) {
            firstOpenSectionId = item.id;
          }
        });

        const initialOpenSections = nestedTOC.reduce(
          (acc, item) => {
            acc[item.id] = item.id === firstOpenSectionId;
            return acc;
          },
          {} as { [key: string]: boolean },
        );

        setOpenSections(initialOpenSections);
      }
    }
  }, [richTextContent, addIdToHeadings, generateUniqueId]);

  // Handle the table pointer on load
  useEffect(() => {
    if (contentRef.current) {
      const tables = contentRef.current.querySelectorAll("table");
      tables.forEach((table) => {
        const parent = table.closest(".table-pointer");
        if (!parent) return;

        const isOverflowing = table.scrollWidth > parent.clientWidth;
        parent.classList.toggle("show-pointer", isOverflowing);
      });
    }
  }, [contentAfterFirstParagraph]);

  // Handle on page resize, check if the table is overflowing and add the show-pointer class to the parent
  useEffect(() => {
    const handleResize = () => {
      const tables = contentRef.current?.querySelectorAll("table");
      if (!tables) return;

      tables.forEach((table) => {
        const parent = table.closest(".table-pointer");
        if (!parent) return;

        const isOverflowing = table.scrollWidth > parent.clientWidth;
        parent.classList.toggle("show-pointer", isOverflowing);
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [contentAfterFirstParagraph]);

  const renderTOCHTML = () => {
    return (
      tocItems.length > 0 && (
        <aside
          className={cn(
            "rounded-lg text-base font-bold leading-7",
            onlyTOC ? "article-toc-sm mb-2" : "mb-4",
          )}
        >
          {!onlyTOC && (
            <h2 className="article-toc-title text-base font-bold leading-7 text-pink-200">
              <span>目次</span>
            </h2>
          )}
          <div className={cn("", onlyTOC ? "pb-0" : "pb-[1.875rem]")}>
            {renderTOC(tocItems)}
          </div>
        </aside>
      )
    );
  };

  if (onlyTOC) {
    return renderTOCHTML();
  }

  return (
    <div className="article-container">
      <article className="prose max-w-none">
        <div
          className="content article-content content-before-first-paragraph mb-10"
          dangerouslySetInnerHTML={{
            __html: contentBeforeFirstParagraph,
          }}
        />
        {renderTOCHTML()}

        <ArticleRelated articles={relatedArticles || []} title="関連記事" />

        <section
          ref={contentRef}
          className="tiptap article-content content-after-first-paragraph bg-white"
          dangerouslySetInnerHTML={{
            __html: contentAfterFirstParagraph,
          }}
        ></section>
      </article>
    </div>
  );
};

export default ArticleWithTOC;

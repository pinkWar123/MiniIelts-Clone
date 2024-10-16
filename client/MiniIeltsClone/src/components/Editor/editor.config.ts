import QuillBetterTable from "quill-better-table";
export const MODULES = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["link", "image"],
    ["clean"],
  ],
  table: false, // disable table module
  "better-table": {
    operationMenu: {
      items: {
        unmergeCells: {
          text: "Another unmerge cells name",
        },
      },
    },
  },
  keyboard: {
    bindings: QuillBetterTable.keyboardBindings,
  },
};

export const FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

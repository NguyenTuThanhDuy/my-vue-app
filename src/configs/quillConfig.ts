import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css"; // Import a Highlight.js style (choose one that fits your theme)
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/monokai-sublime.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video"], //["formula"],

  // [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  // [{ script: "sub" }, { script: "super" }], // superscript/subscript
  // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  // [{ direction: "rtl" }], // text direction

  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],
  // [{ align: [] }],

  ["clean"], // remove formatting button
];

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);

const globalOptions = {
  //   debug: "info",
  modules: {
    toolbar: toolbarOptions,
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
    syntax: {
      highlight: (txt: string) =>
        hljs.highlightAuto(txt, ["python", "javascript"]).value,
    },
  },
  placeholder: "Say something...",
  theme: "snow",
};

export default globalOptions;

/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];
const globalOptions = {
  //   debug: "info",
  modules: {
    toolbar: toolbarOptions,
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  },
  placeholder: "",
  theme: "snow",
};
// set default globalOptions prop
QuillEditor.props.globalOptions.default = () => globalOptions;
app.component("QuillEditor", QuillEditor);
registerPlugins(app);

app.mount("#app");

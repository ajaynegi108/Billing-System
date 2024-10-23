import grapesjs from "grapesjs";

import { styleManager, panels, deviceManager } from "./editorContent.jsx";
import gjsTuiImageEditor from "grapesjs-tui-image-editor";
import { editorCommands } from "./Commands.jsx";
import { customPlugin, content } from "./Plugin";
// console.log("../assets/css/editorPreview.css)
export const editor = () => {
  return grapesjs.init({
    canvas: {
      // styles: [
      //   "https://charlie-dave.s3.amazonaws.com/assets_images/css/editorPreview.css",
      // ], PREVIOUS
      styles: [
        "https://charlie-dave.s3.amazonaws.com/assets_images/css/editorPreviewnew.css",
      ], //NEW

      // styles: ["assets/css/editorPreview.css"],
    },

    container: "#editor",

    blockManager: {
      appendTo: "#blocks",
    },

    assetManager: {
      custom: true,
    },
    modal: { custom: true },
    styleManager: styleManager,

    selectorManager: {
      appendTo: "#styles-container",
    },

    traitManager: {
      appendTo: "#trait-container",
    },

    layerManager: {
      appendTo: "#layers-container",
    },
    panels,
    deviceManager: deviceManager,

    plugins: [editorCommands, content, gjsTuiImageEditor, customPlugin],

    pluginsOpts: {
      "gjs-preset-newsletter": {
        // modalTitleImport: "Import template",
        // modalLabelExport: "Copy the code and use it wherever you want",
      },

      "grapesjs-component-code-editor": {
        /* Test here your options  */
      },

      "grapesjs-tui-image-editor": {
        script: [
          // 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
          "https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js",
          "https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js",
          "https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js",
        ],
        style: [
          "https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css",
          "https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css",
        ],
      },
    },
  });
};

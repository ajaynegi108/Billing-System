import {
  cmdClear,
  cmdDeviceDesktop,
  cmdDeviceMobile,
  cmdDeviceTablet,
} from "./consts";

import $ from "jquery";
export const opts = {
  blocks: ["button", "text", "image", "quote", "link"],
  block: () => ({}),
  juiceOpts: {},
  cmdOpenImport: "gjs-open-import-template",
  cmdTglImages: "gjs-toggle-images",
  cmdInlineHtml: "gjs-get-inlined-html",
  modalTitleImport: "Import template",
  modalTitleExport: "Export template",
  modalLabelImport: "",
  modalLabelExport: "Copy the code and use it wherever you want",
  modalBtnImport: "Import",
  codeViewerTheme: "hopscotch",
  importPlaceholder: "",
  inlineCss: true,
  cellStyle: {
    padding: "0",
    margin: "0",
    "vertical-align": "top",
  },
  tableStyle: {
    height: "150px",
    margin: "0 auto 10px auto",
    padding: "5px 5px 5px 5px",
    width: "100%",
  },
  updateStyleManager: true,
  showStylesOnChange: true,
  showBlocksOnLoad: true,
  useCustomTheme: true,
  textCleanCanvas: "Are you sure you want to clear the canvas?",
  // ...opts,
};

export const editorCommands = (editor) => {
  const { Commands } = editor;
  const { Modal } = editor;
  const txtConfirm = opts.textCleanCanvas;
  // openExportCommand(editor, opts);
  // openImportCommand(editor, opts);
  // openExportCommand(editor, opts);
  // tglImagesCommand(editor, opts);

  Commands.add(cmdDeviceDesktop, {
    run: (ed) => ed.setDevice("Desktop"),
    stop: () => {},
  });

  // Commands.add("open-assets", {
  //   run(editor, sender, opts) {
  //     const assettarget = opts.target;

  //     // openModal(assettarget);
  //   },
  // });

  Commands.add(cmdDeviceTablet, {
    run: (ed) => ed.setDevice("Tablet"),
    stop: () => {},
  });

  Commands.add(cmdDeviceMobile, {
    run: (ed) => ed.setDevice("Mobile"),
    stop: () => {},
  });

  Commands.add(cmdClear, {
    run: (ed) => {
      const cmd = "core:canvas-clear";
      if (txtConfirm) {
        // eslint-disable-next-line no-restricted-globals
        confirm(txtConfirm) && ed.runCommand(cmd);
      } else {
        ed.runCommand(cmd);
      }
    },
  });
};

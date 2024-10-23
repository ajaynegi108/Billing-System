import { modules, structures } from "./editorContent";

import $ from "jquery";

export function customPlugin(editor) {
  var newFinalArray = structures.concat(modules);
  editor.BlockManager.add("basic", newFinalArray);
}

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
  modalLabelExport: "",
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

export function content(editor) {
  const addBlock = (id, blockDef) => {
    editor.Blocks.add(id, {
      select: true,
      ...blockDef,
      ...opts.block(id),
    });
  };

  addBlock("button", {
    label: "Button",
    category: "Blocks",
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 20.5C20 21.3 19.3 22 18.5 22H13C12.6 22 12.3 21.9 12 21.6L8 17.4L8.7 16.6C8.9 16.4 9.2 16.3 9.5 16.3H9.7L12 18V9C12 8.4 12.4 8 13 8S14 8.4 14 9V13.5L15.2 13.6L19.1 15.8C19.6 16 20 16.6 20 17.1V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H8V12H4V4H20V12H18V14H20C21.1 14 22 13.1 22 12V4C22 2.9 21.1 2 20 2Z" />
    </svg>`,
    content: `<table border="0" cellspacing="0" cellpadding="0">
      <tr>
          <td style="padding: 12px 18px 12px 18px; border-radius:5px; background-color: #1F7F4C;" align="center">
              <a rel="noopener" target="_blank" href="#" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block;">Button</a>
          </td>
      </tr>
    </table>`,
  });

  addBlock("text", {
    label: "Text",
    category: "Blocks",
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
    </svg>`,
    activate: true,
    content: {
      type: "text",
      content: "Insert your text here",
      style: { padding: "10px" },
    },
  });

  addBlock("image", {
    label: "Image",
    category: "Blocks",
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
    </svg>`,
    // attributes: { class: "retina-image" },
    activate: true,
    // content: {
    //   type: "image",
    //   style: { color: "black" },
    // },
    content: `<img src="" alt="img" width=""/>`,
  });

  addBlock("quote", {
    label: "Quote",
    category: "Blocks",
    media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>`,
    content:
      '<blockquote class="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit</blockquote>',
  });

  addBlock("link", {
    label: "Link",
    category: "Blocks",
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"></path>
    </svg>`,
    content: {
      type: "link",
      content: "Link",
      style: { color: "#3b97e3" },
    },
  });

  addBlock("linkblock", {
    label: "Link Block",
    category: "Blocks",
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"></path>
    </svg>`,
    content: {
      type: "link",
      editable: false,
      droppable: true,
      style: {
        display: "inline-block",
        padding: "5px",
        "min-height": "50px",
        "min-width": "50px",
      },
    },
  });

  addBlock("social-icons", {
    label: "Social Icons",
    category: "Blocks",
    media: `
      <svg viewBox="0 0 24 24" width="24px" height="24px">
        <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z" />
      </svg>
    `,
    content: `<table style="display: inline-block; margin:0 auto">
    <tr>
      <td style="padding: 10px;">
        <a href="https://www.facebook.com/your-page-username">
          <img src="https://image.flaticon.com/icons/svg/124/124010.svg" alt="Facebook icon" width="32" height="32">
        </a>
      </td>
      <td style="padding: 10px;">
        <a href="https://www.instagram.com/your-username">
          <img src="https://image.flaticon.com/icons/svg/124/124012.svg" alt="Instagram icon" width="32" height="32">
        </a>
      </td>
  
      <td style="padding: 10px;">
        <a href="https://www.facebook.com/your-page-username">
          <img src="https://image.flaticon.com/icons/svg/124/124010.svg" alt="Facebook icon" width="32" height="32">
        </a>
      </td>
      <td style="padding: 10px;">
        <a href="https://www.instagram.com/your-username">
          <img src="https://image.flaticon.com/icons/svg/124/124012.svg" alt="Instagram icon" width="32" height="32">
        </a>
      </td>
    </tr>
  </table>`,
  });
}

function dynamicOpenModal(data) {
  $(".gjs-block-category:eq(3)").empty();

  $(".gjs-block-category:eq(2)").after(data);
}

export const editorOnLoad = (editor) => {
  editor.on("component:selected", (model) => {
    var selected = model;
    if (selected !== undefined) {
      let parent = model.parent();
      while (parent && parent.attributes.type !== "wrapper") {
        selected = parent;
        parent = selected.parent();
      }
      // console.log("SELCTED:::::::::::::::", selected.parent());

      var fID = [];
      selected.get("components").each((child) => {
        if (child.getAttributes().class !== "not-visible")
          fID.push(child.getAttributes().id);
      });

      var FinalM = "";
      fID.forEach((val, i) => {
        FinalM += `<li id="dynamicLi_${val}" data-id=${val} data-operation="select">
    <i class="fa fa-object-group">
    </i> &nbsp; ${i === 0 ? "Default" : `Label ${i}`} <span>
    <i class="fa fa-edit" id="editLi_${val}"  data-id=${val} data-operation ="edit"></i>
     <i class="fa fa-trash" id="deleteLi_${val}" data-id=${val} data-operation ="delete"></i> <i class="fa fa-copy">
     </i>
      </span></li>`;
      });
      if (selected.attributes.type !== "wrapper") {
        let isExist = selected.getAttributes().class || "";
        const defaultM = `
              <div class="gjs-block-category">
    <div class="gjs-title">
    
      Dynamic Content
    </div>
    <div class="gjs-blocks-c" style="display: block;"><div id="dynamicBlock">
    
    <ul class="dynamicList">
    <li id="dynamicLi_default" data-id="default" data-operation="select">
    <i class="fa fa-object-group">
    </i> &nbsp; Default <span>
    <i class="fa fa-edit" id="editLi_default" data-id="default" data-operation ="edit"></i>
     <i class="fa fa-trash" id="deleteLi_default" data-id="default" data-operation ="delete"></i> <i class="fa fa-copy">
     </i>
      </span></li>
  
  
    </ul>
    <button class="addCondition" id="addCondition" >Add Condition</button>
    
    </div>
      </div></div>
  
          
              
         `;

        const defaultW = $(`
              <div class="gjs-block-category">
    <div class="gjs-title">
    
      Dynamic Content
    </div>
    <div class="gjs-blocks-c" style="display: block;"><div id="dynamicBlock">
    
    <ul class="dynamicList">
  ${FinalM}
  
  
    </ul>
    <button class="addCondition" id="addCondition">Add Condition</button>
    
    </div>
      </div></div>
  
          
              
         `);
        if (isExist.includes("dynamicS") && isExist !== "") {
          if (selected.get("components").length > 1) {
            dynamicOpenModal(defaultW);
          } else {
            dynamicOpenModal(defaultM);
          }
        } else {
          $(".gjs-block-category:eq(3)").empty();
        }
      }
    }
  });

  editor.onReady(() => {
    const categories = editor.BlockManager.getCategories();
    const styleManager = editor.StyleManager.getSectors();
    styleManager.each((sector) => {
      sector.set("open", false).on("change:open", (opened) => {
        opened.get("open") &&
          styleManager.each((sector) => {
            sector !== opened && sector.set("open", false);
          });
      });
    });
    categories.each((category) => {
      category.set("open", false).on("change:open", (opened) => {
        opened.get("open") &&
          categories.each((category) => {
            category !== opened && category.set("open", false);
          });
      });
    });

    editor.RichTextEditor.add("custom-vars", {
      icon: `<select class="gjs-field">
        <option value="">- Merge Field -</option>
          <option value="--firstname--">FirstName</option>
            <option value="--lastname--">LastName</option>
            <option value="--age--">Age</option>
          </select>`,
      // Bind the 'result' on 'change' listener
      event: "change",
      result: (rte, action) => rte.insertHTML(action.btn.firstChild.value),
      // Reset the select on change
      update: (rte, action) => {
        action.btn.firstChild.value = "";
      },
    });

    editor.RichTextEditor.add("fontSize", {
      icon: `<input list="fontSize" name="fontSize" style="width:40px !important" placeholder="px">
       <datalist id="fontSize">
        <option>8px</option>
                <option>9px</option>
                <option>10px</option>
                <option>11px</option>
                <option>12px</option>
                <option>13px</option>
                <option>14px</option>
                <option>15px</option>
                <option>16px</option>
                <option>17px</option>
                <option>18px</option>
                <option>19px</option>
                <option>20px</option>
                <option>21px</option>
                <option>22px</option>
                <option>23px</option>
                <option>24px</option>
                 <option>25px</option>
                  <option>26px</option>
                   <option>27px</option>
                    <option>28px</option>
                     <option>29px</option>
                      <option>30px</option>
                       <option>48px</option>
                        <option>72px</option>
                   </datalist>`,
      // Bind the 'result' on 'change' listener
      event: "change",
      result: (rte, action) => {
        const selectedValue =
          action.btn.firstElementChild.value || action.btn.firstChild.value;

        rte.insertHTML(
          `<span style="font-size: ${selectedValue}; line-height: 100%;">${rte.selection()}</span>`
        );
      },
    });

    $("#style-tab").click(() => {
      if (localStorage.getItem("theme") === "dark") {
        $("#style-tab").css("color", "#000");
        $("#home-tab").css("color", "#fff");
      }
    });

    $("#home-tab").click(() => {
      if (localStorage.getItem("theme") === "dark") {
        $("#home-tab").css("color", "#000");
        $("#style-tab").css("color", "#fff");
      }
    });

    if (localStorage.getItem("theme") === "dark")
      if (!$("#style-tab").hasClass("active")) {
        $("#style-tab").css("color", "#fff");
      }
  });

  // editor.on("block:drag:stop", (model) => {
  //   let parent = model.parent();
  //   console.log(parent.attributes.tagName);
  //   if (parent.attributes.tagName === "body") {
  //     console.log(model);
  //     model.addClass("tb-structure");
  //   }
  // });

  //   const blocksHeader = $(`

  //     <input class="form-control" style="color:black;width:70%;padding:2px 10px;border-radius:30px; margin: 10px 0px" type="text" placeholder="Search Modules" id="searchFilter">

  // `);
  //part of blockheader
  // &nbsp; &nbsp; <span id="gridView"><i class="fa fa-th" aria-hidden="true" style="font-size:22px !important; padding-top: 3px; cursor:pointer"
  //         title="Grid View"></i> </span> &nbsp; &nbsp;
  //     <span id="listView"><i class="fa fa-th-list" aria-hidden="true" style="font-size:22px !important; padding-top:3px; cursor:pointer" title="List View"></i> </span>

  // $(".gjs-blocks-c:eq(2)").prepend(blocksHeader);
  $(".gjs-blocks-c:eq(2)").addClass("backgroundWhite");
  // $("#gridView").click(function () {
  //   $(".gjs-block-category:eq(2) .gjs-block").removeClass("gridView");
  // });

  // $("#listView").click(function () {
  //   $(".gjs-block-category:eq(2) .gjs-block").addClass("listView");
  // });

  $("#searchFilter").on("keyup", () => {
    var searchVal = $("#searchFilter").val();

    if (searchVal !== "") {
      modules.filter((module) => {
        if (module.name.toLowerCase().indexOf(searchVal.toLowerCase()) === -1) {
          editor.BlockManager.remove(module.id);
        } else {
        }
      });
    } else {
      editor.BlockManager.add("basic", modules);
    }
  });
};

// export const Panel = (editor) => {
//   const { Panels } = editor;
//   const { cmdOpenImport, cmdTglImages } = opts;
//   const openExport = "export-template";
//   const openStyleManager = "open-sm";
//   const openTraits = "open-tm";
//   const openLayers = "open-layers";
//   const openBlocks = "open-blocks";
//   const activateOutline = "sw-visibility";
//   const activateFullscreen = "fullscreen";
//   const activatePreview = "preview";
//   const iconStyle = 'style="display: block; max-width: 22px"';

//   // Turn off default devices select and create new one
//   editor.getConfig().showDevices = false;

//   Panels.getPanels().reset([
//     {
//       id: "commands",
//       buttons: [{}],
//     },
//     {
//       id: "devices-c",
//       buttons: [
//         {
//           id: cmdDeviceDesktop,
//           command: cmdDeviceDesktop,
//           active: true,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
//       </svg>`,
//         },
//         {
//           id: cmdDeviceTablet,
//           command: cmdDeviceTablet,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z" />
//       </svg>`,
//         },
//         {
//           id: cmdDeviceMobile,
//           command: cmdDeviceMobile,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
//       </svg>`,
//         },
//       ],
//     },
//     {
//       id: "options",
//       buttons: [
//         {
//           id: activateOutline,
//           command: activateOutline,
//           context: activateOutline,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//       <path fill="currentColor" d="M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z" />
//   </svg>`,
//         },
//         {
//           id: activatePreview,
//           context: activatePreview,
//           command: activatePreview,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24"><path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>`,
//         },
//         {
//           id: activateFullscreen,
//           command: activateFullscreen,
//           context: activateFullscreen,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
//       </svg>`,
//         },
//         {
//           id: openExport,
//           command: openExport,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
//       </svg>`,
//         },
//         {
//           id: cmdOpenImport,
//           command: cmdOpenImport,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
//       </svg>`,
//         },
//         {
//           id: cmdTglImages,
//           command: cmdTglImages,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//         <path fill="currentColor" d="M5 3C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H14.09C14.03 20.67 14 20.34 14 20C14 19.32 14.12 18.64 14.35 18H5L8.5 13.5L11 16.5L14.5 12L16.73 14.97C17.7 14.34 18.84 14 20 14C20.34 14 20.67 14.03 21 14.09V5C21 3.89 20.1 3 19 3H5M16.47 17.88L18.59 20L16.47 22.12L17.88 23.54L20 21.41L22.12 23.54L23.54 22.12L21.41 20L23.54 17.88L22.12 16.46L20 18.59L17.88 16.47L16.46 17.88Z"/>
//       </svg>`,
//         },
//         {
//           id: "undo",
//           command: "core:undo",
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
//       </svg>`,
//         },
//         {
//           id: "redo",
//           command: "core:redo",
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
//       </svg>`,
//         },
//         {
//           id: cmdClear,
//           command: cmdClear,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//             <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
//         </svg>`,
//         },
//       ],
//     },
//     {
//       id: "views",
//       buttons: [
//         {
//           id: openStyleManager,
//           command: openStyleManager,
//           active: true,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//           <path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
//       </svg>`,
//         },
//         {
//           id: openTraits,
//           command: openTraits,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//         <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
//     </svg>`,
//         },
//         {
//           id: openLayers,
//           command: openLayers,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//         <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
//     </svg>`,
//         },
//         {
//           id: openBlocks,
//           command: openBlocks,
//           label: `<svg ${iconStyle} viewBox="0 0 24 24">
//         <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
//     </svg>`,
//         },
//       ],
//     },
//   ]);

//   // On component change show the Style Manager
//   opts.showStylesOnChange &&
//     editor.on("component:selected", () => {
//       const openLayersBtn = Panels.getButton("views", openLayers);

//       // Don't switch when the Layer Manager is on or there is no selected components
//       if (
//         (!openLayersBtn || !openLayersBtn.get("active")) &&
//         editor.getSelected()
//       ) {
//         const openSmBtn = Panels.getButton("views", openStyleManager);
//         openSmBtn?.set("active", true);
//       }
//     });

//   // Do stuff on load
//   editor.onReady(() => {
//     if (opts.showBlocksOnLoad) {
//       const openBlocksBtn = Panels.getButton("views", openBlocks);
//       openBlocksBtn?.set("active", true);
//     }
//   });
// };

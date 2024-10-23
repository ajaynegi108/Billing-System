import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import juice from "juice";
import {
  styleManager,
  panels,
  deviceManager,
} from "./editor/editorContent.jsx";
import gjsTuiImageEditor from "grapesjs-tui-image-editor";
import { editorCommands } from "./editor/Commands.jsx";
import { customPlugin, content } from "./editor/Plugin.jsx";
import "grapesjs/dist/css/grapes.min.css";
import api from "../utils/api.jsx";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InvoiceEditor = ({
  type = "create",
  templateId,
  setIsOpen,
  getTemplateList,
}) => {
  const navigate = useNavigate();
  const [editor, setEditor] = useState(null);
  const [htmlToLoad, setHtmlToLoad] = useState(null);
  const [isBtnEnable, setIsBtnEnable] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
    description: "",
  });
  const setFormValue = (name, value) =>
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

  useEffect(() => {
    const editorInstance = grapesjs.init({
      canvas: {
        // styles: ["assets/css/editor.css"],
      },

      container: "#editor",

      blockManager: {
        appendTo: "#blocks",
      },

      assetManager: {
        // Disable default asset manager
        // If you have any custom settings, add them here.
        storeOnLoad: false, // Prevent storing assets on load
      },

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

      panels: panels,
      deviceManager: deviceManager,

      // Plugins section
      plugins: [editorCommands, content, customPlugin],

      pluginsOpts: {
        "gjs-preset-newsletter": {},
        "grapesjs-component-code-editor": {},
      },

      // Disable storage
      storageManager: {
        type: "", // Disable storage manager
        // or set type: 'none'
        autosave: false, // Disable auto-save
        autoload: false, // Disable auto-load
      },
    });
    if (htmlToLoad) {
      console.log(htmlToLoad);
      editorInstance.setComponents(htmlToLoad);
    }

    setEditor(editorInstance);
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, [htmlToLoad]);
  const saveTemplate = async () => {
    try {
      let finalHtml = ""; // Initialize finalHtml

      if (editor) {
        const html = `<style>${editor.getCss()}</style> ${editor.getHtml()}`;
        finalHtml = juice(html);
      } else {
        // Handle case where editor is not defined
        toast.error("Editor not initialized. Please check your setup.");
        return; // Exit the function if the editor is not available
      }
      setIsBtnEnable(true);
      const formData = new FormData();
      formData.append("content", finalHtml);
      formData.append("name", formDetails.name);
      formData.append("description", formDetails.description);

      let response;
      if (type === "create") {
        response = await api.post("template/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the right content type
          },
        });
      }
      if (type === "update") {
        response = await api.put(`template/update/${templateId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the right content type
          },
        });
        getTemplateList();
        setIsOpen(false);
        setIsBtnEnable(false);
      }

      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/home/managetemplate");
      }, 2000);
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error(
        "An error occurred while saving the template. Please try again."
      );
    }
  };

  useEffect(() => {
    const getInvoiceById = async () => {
      try {
        const response = await api.get(`/template/gettemplate/${templateId}`);

        const { name, description, content } = response.data.template;
        setFormDetails({
          name: name,
          description: description,
        });
        setHtmlToLoad(content);
      } catch (err) {
        console.log(err);
      }
    };
    getInvoiceById();
  }, [templateId]);

  return (
    <>
      {type !== "update" && (
        <>
          {" "}
          <ToastContainer />
        </>
      )}

      <div className="h-full w-full flex">
        <div className="w-full">
          <div className="flex justify-between mb-3 border-b-2 p-1">
            <div className="flex gap-3 w-full">
              <input
                type="text"
                className="border p-2 w-[30%]"
                placeholder="Enter Template Name"
                onChange={(e) => setFormValue("name", e.target.value)}
                value={formDetails.name}
              />
              <input
                type="text"
                className="border p-2 w-[50%]"
                placeholder="Enter Description"
                onChange={(e) => setFormValue("description", e.target.value)}
                value={formDetails.description}
              />
            </div>
            <div>
              <button
                className="bg-[blue] p-2 w-[100px] text-white"
                onClick={saveTemplate}
                disabled={isBtnEnable}
              >
                {isBtnEnable ? "Saving" : "Save"}
              </button>
            </div>
          </div>
          <div className="flex mt mr-0 ml-0">
            <div className="w-[20%] h-[100vh] overflow-y-auto" id="navbar">
              <div className="tab-content">
                <div id="blocks"></div>
              </div>
            </div>

            <div className="w-[60%] ml-auto mb-5" id="editorB">
              <div id="editor" className="h-[100vh] overflow-y-auto"></div>
            </div>
            <div className="w-[20%] h-[100vh] overflow-y-auto">
              <div id="layers-container"></div>
              <div id="styles-container"></div>
              <div id="trait-container"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceEditor;

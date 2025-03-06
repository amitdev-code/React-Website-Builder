import { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import { BuilderElementsSidebar } from "./BuilderHelper/BuilderElementsSidebar/BuilderElementsSidebar";
import BuilderElementDesigner from "./BuilderHelper/BuilderElementDesigner/BuilderElementDesigner";
import { useBuilder } from "../context/BuilderContext";
import { v4 as uuidv4 } from "uuid";
import { BuilderComponent, PageConfig } from "./builder.type";

const Builder = () => {
  const {
    setToggleLayoutSidebar,
    toggleLayoutSidebar,
    builderType,
    setBuilderType,
    getMainWidth,
  } = useBuilder();
  const [builderJSON, setBuilderJSON] = useState<PageConfig[]>([]);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    try {
      const data = JSON.parse(event.dataTransfer.getData("application/json"));
      if (setBuilderJSON.length) {
        const newComponent: BuilderComponent = {
          id: uuidv4(),
          name: data.component,
          type: data.type,
          canHaveChildren: true,
          children: [],
        };
        builderJSON[0].children.push(newComponent);
        setBuilderJSON([...builderJSON]);
      } else {
        const pageConstructor: PageConfig = {
          id: uuidv4(),
          name: "page-1",
          children: [
            {
              id: uuidv4(),
              name: data.component,
              type: data.type,
              canHaveChildren: true,
              children: [],
            },
          ],
        };
        setBuilderJSON([pageConstructor]);
      }
    } catch (error) {
      console.error("Error parsing drop data:", error);
    }
  };
  return (
    <Fragment>
      <BuilderElementsSidebar />
      <div className="z-1 fixed top-0 w-full flex justify-between items-center mx-3">
        <div className="flex-none">
          <Icon
            icon={"bx:bx-menu"}
            className="w-6 h-6"
            onClick={() => {
              setToggleLayoutSidebar(!toggleLayoutSidebar);
            }}
          />
        </div>
        <div
          className={`flex w-[100] flex-grow justify-center align-center my-3`}
        >
          <div className="text-sm font-medium text-center text-gray-500 border-b border-indigo-400 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2" onClick={() => setBuilderType(0)}>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center px-4 rounded-t-lg active ${
                    builderType === 0
                      ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-b-2 border-transparent"
                  } group`}
                >
                  Drag And Drop Builder
                </a>
              </li>
              <li className="me-2" onClick={() => setBuilderType(1)}>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center px-4 rounded-t-lg active ${
                    builderType === 1
                      ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-b-2 border-transparent"
                  } group`}
                  aria-current="page"
                >
                  JSON BUILDER
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <main
        className={`mt-[60px] ${
          toggleLayoutSidebar ? "mx-[335px]" : ""
        } ${getMainWidth()}`}
      >
        {/* MAIN WEBSITE DESIGN */}
        <div className="z-3 h-screen bg-white-500 m-1">
          <div
            className="overflow-y-auto bg-white h-full"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* Drop zone content */}
          </div>
        </div>
      </main>
      <BuilderElementDesigner />
    </Fragment>
  );
};

export default Builder;

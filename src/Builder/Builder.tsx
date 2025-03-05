import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Builder = () => {
  const [leftSideBarSelectedTab, setLeftSideBarSelectedTab] = useState(0);
  const [builderType, setBuilderType] = useState(0);
  const [toggleStyleEditSidebar, setToggleStyleEditSidebar] = useState(false);
  const [toggleLayoutSidebar, setToggleLayoutSidebar] = useState(false);

  useEffect(() => {
    setToggleLayoutSidebar(false);
  }, [toggleStyleEditSidebar]);

  useEffect(() => {
    setToggleStyleEditSidebar(false);
  }, [toggleLayoutSidebar]);

  const getMainWidth = () => {
    if (toggleLayoutSidebar || toggleStyleEditSidebar) {
      return "w-[calc(100%-350px)]";
    } else {
      return "w-full";
    }
  };

  return (
    <Fragment>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 ${toggleLayoutSidebar ? "" : "hidden"
          }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="border-b border-indigo-400 dark:border-gray-700">
            <Icon
              icon={"system-uicons:cross"}
              className="w-6 h-6 float-right"
              onClick={() => {
                setToggleLayoutSidebar(!toggleLayoutSidebar);
              }}
            />
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center text-gray-500 dark:text-gray-400">
              <li className="me-2" onClick={() => setLeftSideBarSelectedTab(0)}>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center p-4 rounded-t-lg active ${leftSideBarSelectedTab === 0
                      ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-b-2 border-transparent"
                    } group`}
                >
                  <Icon
                    icon="hugeicons:layout-05"
                    className={`w-4 h-4 me-2 ${leftSideBarSelectedTab === 0
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-500 dark:text-gray-400"
                      }`}
                  />
                  Layouts
                </a>
              </li>
              <li className="me-2" onClick={() => setLeftSideBarSelectedTab(1)}>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center p-4 rounded-t-lg active ${leftSideBarSelectedTab === 1
                      ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-b-2 border-transparent"
                    } group`}
                  aria-current="page"
                >
                  <Icon
                    icon="mdi:code-block-html"
                    className={`w-4 h-4 me-2 ${leftSideBarSelectedTab === 1
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-gray-500 dark:text-gray-400"
                      }`}
                  />
                  Elements
                </a>
              </li>
            </ul>
          </div>

          {leftSideBarSelectedTab === 0 && (
            <Fragment>
              <p className="text-center text-md font-bold">Flex Layout</p>
              <div className="flex flex-col gap-2 p-2">
                {/* Flex ITEM @center*/}
                <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab" draggable="true">
                  <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
                    <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>
                {/* Flex @justify-between */}
                <div className="flex flex-1/2 flex-wrap p-3 items-center justify-between border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab" draggable="true">
                  <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
                    <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
                    <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>
                {/* Flex @justify-around */}
                <div className="flex flex-1/2 flex-wrap p-3 items-center justify-around border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab" draggable="true">
                  <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
                    <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
                    <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>

              </div>
              <p className="text-center text-md font-bold">Grid Layout</p>
              <div className="flex flex-col gap-2 p-2">

              </div>
            </Fragment>
          )}
          {leftSideBarSelectedTab === 1 && <h1>Elements</h1>}
        </div>
      </aside>
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
                  className={`inline-flex items-center justify-center px-4 rounded-t-lg active ${builderType === 0
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
                  className={`inline-flex items-center justify-center px-4 rounded-t-lg active ${builderType === 1
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
        className={`mt-[60px] ${toggleLayoutSidebar ? "mx-[335px]" : ""
          } ${getMainWidth()}`}
      >
        {/* MAIN WEBSITE DESIGN */}
        <div className="z-3 h-screen bg-white-500 m-1">
          {builderType === 0 && (
            <div className="overflow-y-auto bg-white">
              {/* D */}
            </div>
          )}
          {builderType === 1 && <div>JSON BUILDER</div>}
        </div>
      </main>
      <aside
        id="default-sidebar"
        className={`fixed top-0 right-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 ${toggleStyleEditSidebar ? "" : "hidden"
          }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          Left Sidebar
        </div>
      </aside>
    </Fragment>
  );
};

export default Builder;

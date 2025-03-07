import { Fragment } from "react";
import { useBuilder } from "../../../context/BuilderContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ComponentType } from "../../builder.type";
interface DraggableComponentProps {
  type: ComponentType;
  design: React.ReactNode;
  component: string;
  canHaveChildren: boolean;
}

export const BuilderElementsSidebar = () => {
  const {
    toggleLayoutSidebar,
    setToggleLayoutSidebar,
    setLeftSideBarSelectedTab,
    leftSideBarSelectedTab,
  } = useBuilder();

  const handleDragStart = (
    event: React.DragEvent,
    component: string,
    type: string,
    canHaveChildren: boolean
  ) => {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        component,
        canHaveChildren,
        type: type,
      })
    );
  };

  const components: DraggableComponentProps[] = [
    {
      type: "div",
      canHaveChildren: true,
      component: "FlexBox",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
            <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
      ),
    },
    {
      type: "div",
      canHaveChildren: true,
      component: "JustifyBetweenFlexBox",
      design: (
        <div className="flex flex-1/2 flex-wrap p-3 items-center justify-between border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
            <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
            <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
      ),
    },
    {
      type: "div",
      component: "JustifyAroundFlexBox",
      canHaveChildren: true,
      design: (
        <div className="flex flex-1/2 flex-wrap p-3 items-center justify-around border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
            <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
            <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
      ),
    },
  ];

  const Elements: DraggableComponentProps[] = [
    {
      type: "text",
      canHaveChildren: false,
      component: "h1",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <Icon
            icon={"heroicons:h1-16-solid"}
            className="w-6 h-6 text-indigo-400"
          />
        </div>
      ),
    },
    {
      type: "text",
      canHaveChildren: false,
      component: "h2",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <Icon
            icon={"heroicons:h2-16-solid"}
            className="w-6 h-6 text-indigo-400"
          />
        </div>
      ),
    },
    {
      type: "text",
      canHaveChildren: false,
      component: "h3",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <Icon
            icon={"heroicons:h3-16-solid"}
            className="w-6 h-6 text-indigo-400"
          />
        </div>
      ),
    },
    {
      type: "text",
      canHaveChildren: false,
      component: "h4",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <Icon
            icon={"material-symbols:format-h4-rounded"}
            className="w-6 h-6 text-indigo-400"
          />
        </div>
      ),
    },
    {
      type: "text",
      canHaveChildren: false,
      component: "h5",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <Icon
            icon={"material-symbols:format-h5-rounded"}
            className="w-6 h-6 text-indigo-400"
          />
        </div>
      ),
    },
    {
      type: "text",
      canHaveChildren: false,
      component: "h6",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <Icon
            icon={"material-symbols:format-h6-rounded"}
            className="w-6 h-6 text-indigo-400"
          />
        </div>
      ),
    },
    {
      type: "text",
      canHaveChildren: true,
      component: "p",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <Icon
            icon={"mdi:format-paragraph"}
            className="w-6 h-6 text-indigo-400"
          />
        </div>
      ),
    },
    {
      type: "image",
      canHaveChildren: false,
      component: "img",
      design: (
        <div className="flex flex-wrap p-3 items-center justify-center border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab">
          <Icon icon={"mynaui:image"} className="w-6 h-6 text-indigo-400" />
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          toggleLayoutSidebar ? "" : "hidden"
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
                  className={`inline-flex items-center justify-center p-4 rounded-t-lg active ${
                    leftSideBarSelectedTab === 0
                      ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-b-2 border-transparent"
                  } group`}
                >
                  <Icon
                    icon="hugeicons:layout-05"
                    className={`w-4 h-4 me-2 ${
                      leftSideBarSelectedTab === 0
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
                  className={`inline-flex items-center justify-center p-4 rounded-t-lg active ${
                    leftSideBarSelectedTab === 1
                      ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : "border-b-2 border-transparent"
                  } group`}
                  aria-current="page"
                >
                  <Icon
                    icon="mdi:code-block-html"
                    className={`w-4 h-4 me-2 ${
                      leftSideBarSelectedTab === 1
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
            <div className="flex flex-col gap-2 p-2">
              {components.map((component, index) => (
                <div
                  key={index}
                  onDragStart={(e) =>
                    handleDragStart(
                      e,
                      component.component,
                      component.type,
                      component.canHaveChildren
                    )
                  }
                  draggable={true}
                  className="cursor-grab active:cursor-grabbing"
                >
                  {component.design}
                </div>
              ))}
            </div>
          )}
          {leftSideBarSelectedTab === 1 && (
            <div className="flex flex-wrap gap-2 p-2 items-center justify-center">
              {Elements.map((component, index) => (
                <div
                  key={index}
                  onDragStart={(e) =>
                    handleDragStart(
                      e,
                      component.component,
                      component.type,
                      component.canHaveChildren
                    )
                  }
                  draggable={true}
                  className="cursor-grab active:cursor-grabbing"
                >
                  {component.design}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </Fragment>
  );
};

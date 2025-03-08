import { Fragment, useEffect, useState } from "react";
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
    styleEditSidebar,
    setStyleEditSidebar,
  } = useBuilder();
  const [builderJSON, setBuilderJSON] = useState<PageConfig[]>([]);
  const [renderJSON, setRenderJSON] = useState<PageConfig[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [dragOverElementId, setDragOverElementId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-builder-element="true"]')) {
        setSelectedElementId(null);
        if (styleEditSidebar) {
          setStyleEditSidebar(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const manageRenderJSON = (builderJSONData: PageConfig[]) => {
    if (!builderJSONData.length) return [];
    // Deep clone the builderJSONData to avoid mutations
    const processedJSON: PageConfig[] = JSON.parse(
      JSON.stringify(builderJSONData)
    );

    return processedJSON;
  };

  useEffect(() => {
    setRenderJSON(manageRenderJSON(builderJSON));
  }, [builderJSON]);

  const handleDragOver = (
    event: React.DragEvent,
    componentId?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canHaveChildren?: boolean
  ) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    if (componentId) {
      setDragOverElementId(componentId);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOverElementId(null);
  };

  const findAndUpdateComponent = (
    components: BuilderComponent[],
    targetId: string,
    newChild: BuilderComponent
  ): boolean => {
    for (const component of components) {
      if (component.id === targetId) {
        component?.children?.push(newChild);
        return true;
      }
      if (component.children && component.children.length > 0) {
        if (findAndUpdateComponent(component.children, targetId, newChild)) {
          return true;
        }
      }
    }
    return false;
  };

  const handleDrop = (event: React.DragEvent, targetId?: string) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const data = JSON.parse(event.dataTransfer.getData("application/json"));

      const newComponent: BuilderComponent = {
        id: uuidv4(),
        name: data.component,
        type: data.type,
        canHaveChildren: data.canHaveChildren,
        className: "",
        defaultBuilderClassName: `border-2 border-dashed border-indigo-400 ${
          data.type === "div" ? "h-[200px]" : "p-3"
        }`,
        useDefaultClassName: true,
        children: [],
      };

      if (targetId && builderJSON.length > 0) {
        // Add to nested children
        const updated = findAndUpdateComponent(
          builderJSON[0].children,
          targetId,
          newComponent
        );
        if (updated) {
          setBuilderJSON([...builderJSON]);
        }
      } else if (builderJSON.length) {
        // Add to root level
        builderJSON[0].children.push(newComponent);
        setBuilderJSON([...builderJSON]);
      } else {
        // Create new page
        const pageConstructor: PageConfig = {
          id: uuidv4(),
          name: "page-1",
          children: [newComponent],
        };
        setBuilderJSON([pageConstructor]);
      }
    } catch (error) {
      console.error("Error parsing drop data:", error);
    }
  };
console.log(selectedElementId);

  const renderComponent = (component: BuilderComponent) => {
    const isSelected = selectedElementId === component.id;
    const isDraggedOver = dragOverElementId === component.id;
    const commonProps = {
      key: component.id,
      "data-builder-element": "true",
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setSelectedElementId(component.id);
        setStyleEditSidebar(true);
      },
      onDrop: (e: React.DragEvent) => {
        handleDrop(e, component.id);
        setDragOverElementId(null); // Reset drag state after drop
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleDragOver(e, component.id, component.canHaveChildren);
      },
      onDragLeave: (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleDragLeave(e);
      },
      className: `
      relative
      group
      ${
        component.useDefaultClassName
          ? component.defaultBuilderClassName
          : component.className
      }
      ${isSelected ? "border-blue-500 border-2" : ""}
      ${
        isDraggedOver
          ? component.canHaveChildren
            ? "!border-green-500 !border-2"
            : "!border-red-500 !border-2"
          : ""
      }
    `,
    };

    const elementLabel = (
      <div
        className={`
        absolute -top-7 left-0 
        bg-sky-500/60 px-2 py-1 text-xs rounded
        ${isSelected ? "block" : "hidden group-hover:block"}
      `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex align-center justify-between">
          {component.name}
          <Icon
            icon={"proicons:delete"}
            className="h-5 w-5 mx-2 cursor-pointer text-red-500"
          />
        </div>
      </div>
    );

    switch (component.name) {
      case "FlexBox":
        return (
          <div
            {...commonProps}
            key={component.id}
            className={`flex flex-wrap p-3 items-center justify-center ${commonProps.className}`}
          >
            {elementLabel}
            {component.children &&
              component.children.map((child) => renderComponent(child))}
          </div>
        );
      case "JustifyBetweenFlexBox":
        return (
          <div
            {...commonProps}
            key={component.id}
            className={`flex flex-wrap p-3 items-center justify-between ${commonProps.className}`}
          >
            {elementLabel}
            {component.children &&
              component.children.map((child) => renderComponent(child))}
          </div>
        );
      case "JustifyAroundFlexBox":
        return (
          <div
            {...commonProps}
            key={component.id}
            className={`flex flex-wrap p-3 items-center justify-around ${commonProps.className}`}
          >
            {elementLabel}
            {component.children &&
              component.children.map((child) => renderComponent(child))}
          </div>
        );
      case "h1":
        return (
          <h1
            {...commonProps}
            key={component.id}
            className={`${commonProps.className}`}
          >
            {elementLabel}
            {component.props?.text || "Hello World"}
          </h1>
        );
      case "h2":
        return (
          <h2
            {...commonProps}
            key={component.id}
            className={`${commonProps.className}`}
          >
            {elementLabel}
            {component.props?.text || "Hello World"}
          </h2>
        );
      case "h3":
        return (
          <h3
            {...commonProps}
            key={component.id}
            className={`${commonProps.className}`}
          >
            {elementLabel}
            {component.props?.text || "Hello World"}
          </h3>
        );
      case "h4":
        return (
          <h4
            {...commonProps}
            key={component.id}
            className={`${commonProps.className}`}
          >
            {elementLabel}
            {component.props?.text || "Hello World"}
          </h4>
        );
      case "h5":
        return (
          <h5
            {...commonProps}
            key={component.id}
            className={`${commonProps.className}`}
          >
            {elementLabel}
            {component.props?.text || "Hello World"}
          </h5>
        );
      case "h6":
        return (
          <h6
            {...commonProps}
            key={component.id}
            className={`${commonProps.className}`}
          >
            {elementLabel}
            {component.props?.text || "Hello World"}
          </h6>
        );
      case "p":
        return (
          <p
            {...commonProps}
            key={component.id}
            className={`${commonProps.className}`}
          >
            {elementLabel}
            {component.props?.text || "Hello World"}
          </p>
        );
      case "img":
        return (
          <img
            {...commonProps}
            key={component.id}
            src={component.props?.src || "https://placehold.co/600x400"}
            alt={component.props?.alt}
            className={`${commonProps.className}`}
          />
        );
      default:
        return null;
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
        <div className="z-3 h-screen bg-white-500 m-1 mt-[20px]">
          <div
            className="overflow-y-auto bg-white h-full"
            onDrop={handleDrop}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={handleDragLeave}
          >
            {renderJSON.map((page) => (
              <div key={page.id} className="min-h-screen p-4 mt-3">
                {page.children.map((component) => renderComponent(component))}
              </div>
            ))}
          </div>
        </div>
      </main>
      <BuilderElementDesigner selectedItem={selectedElementId} builderJSON={builderJSON} />
    </Fragment>
  );
};

export default Builder;

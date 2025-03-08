import React, { Fragment, useEffect, useState } from "react";
import { useBuilder } from "../../../context/BuilderContext";
import { BuilderComponent, PageConfig } from "../../builder.type";

interface props {
  selectedItem: string | null;
  builderJSON: PageConfig[];
}

const BuilderElementDesigner = ({ selectedItem, builderJSON }: props) => {
  const { styleEditSidebar } = useBuilder();
  const [selectedElement, setSelectedElement] =
    useState<BuilderComponent | null>(null);

  const findSelectedElement = (
    components: BuilderComponent[],
    targetId: string
  ): BuilderComponent | null => {
    for (const component of components) {
      if (component.id === targetId) {
        return component;
      }
      if (component.children && component.children.length > 0) {
        const found = findSelectedElement(component.children, targetId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (selectedItem && builderJSON.length > 0) {
      // Search through all pages
      for (const page of builderJSON) {
        const found = findSelectedElement(page.children, selectedItem);
        if (found) {
          setSelectedElement(found);
          break;
        }
      }
    } else {
      setSelectedElement(null);
    }
  }, [selectedItem, builderJSON]);

  return (
    <Fragment>
      <aside
        id="default-sidebar"
        className={`fixed top-0 right-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          styleEditSidebar ? "" : "hidden"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {selectedElement ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">Element Properties</h2>
              <div className="mb-3">
                <p className="text-sm font-medium">{selectedElement.id}</p>
                <p className="text-sm font-medium">
                  Element Type: {selectedElement.name}
                </p>
              </div>
              {/* You can add more UI elements here to edit the selected element */}
            </div>
          ) : (
            <p>No element selected</p>
          )}
        </div>
      </aside>
    </Fragment>
  );
};

export default BuilderElementDesigner;

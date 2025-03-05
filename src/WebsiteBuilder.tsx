import React, { useState, useRef, Fragment } from "react";

const WebsiteBuilder = () => {
  // Initial state with empty page
  const [pages, setPages] = useState([
    {
      id: "page-1",
      name: "Home Page",
      elements: [],
    },
  ]);

  const [activePage, setActivePage] = useState("page-1");
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [canDrop, setCanDrop] = useState(false);

  // Component definitions
  const componentTypes = [
    {
      component: "FlexComponent",
      name: "Flex Container",
      tailwind: "flex flex-row gap-4 p-4 min-h-16",
      acceptsChildren: true,
      render: (props) => (
        <div {...props} className={`${props.className} flex`}>
          {props.children}
        </div>
      ),
    },
    {
      component: "GridComponent",
      name: "Grid Container",
      tailwind: "grid grid-cols-2 gap-4 p-4 min-h-16",
      acceptsChildren: true,
      render: (props) => (
        <div {...props} className={`${props.className} grid`}>
          {props.children}
        </div>
      ),
    },
    {
      component: "TextComponent",
      name: "Text",
      tailwind: "text-base",
      content: "Lorem ipsum dolor sit amet",
      acceptsChildren: false,
      render: (props) => (
        <div {...props} className={props.className}>
          {props.content}
        </div>
      ),
    },
    {
      component: "HeadingComponent",
      name: "Heading",
      tailwind: "text-2xl font-bold",
      content: "Heading Text",
      acceptsChildren: false,
      render: (props) => (
        <div {...props} className={props.className}>
          {props.content}
        </div>
      ),
    },
    {
      component: "ButtonComponent",
      name: "Button",
      tailwind: "px-4 py-2 bg-blue-500 text-white rounded",
      content: "Button",
      acceptsChildren: false,
      render: (props) => (
        <button {...props} className={props.className}>
          {props.content}
        </button>
      ),
    },
    {
      component: "ImageComponent",
      name: "Image",
      tailwind: "w-full h-auto",
      content: "/api/placeholder/320/240",
      acceptsChildren: false,
      render: (props) => (
        <img
          src={props.content}
          alt="Preview"
          className={props.className}
          {...props}
        />
      ),
    },
  ];

  // Generate unique IDs
  const generateId = (prefix) =>
    `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Find current page data
  const currentPage = pages.find((page) => page.id === activePage);

  // Recursively find an element by ID
  const findElementById = (elements, id) => {
    for (const element of elements) {
      if (element.id === id) {
        return element;
      }
      if (element.children && element.children.length > 0) {
        const found = findElementById(element.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Handle starting drag from the sidebar
  const handleDragStart = (componentInfo) => {
    setDraggedItem({
      ...componentInfo,
      id: generateId(componentInfo.component),
      children: componentInfo.acceptsChildren ? [] : undefined,
    });
  };

  // Handle drag start from the canvas (moving existing elements)
  const handleElementDragStart = (e, elementId) => {
    e.stopPropagation();
    const element = findElementById(currentPage.elements, elementId);
    if (element) {
      setDraggedItem({ ...element, isExisting: true });
    }
  };

  // Check if element can accept children
  const canAcceptChildren = (element) => {
    return element && element.acceptsChildren;
  };

  // Handle drag over to show drop indicators
  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();

    const targetElement = targetId
      ? findElementById(currentPage.elements, targetId)
      : null;

    // Can drop if target is the page or a container that accepts children
    const canDropHere = !targetId || canAcceptChildren(targetElement);

    setDropTarget(targetId);
    setCanDrop(canDropHere);
  };

  // Handle page drag over (root level)
  const handlePageDragOver = (e) => {
    e.preventDefault();
    setDropTarget(null);
    setCanDrop(true);
  };

  // Handle dropping an element
  const handleDrop = (e, targetId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

    // Create a new copy of pages
    const newPages = [...pages];
    const pageIndex = newPages.findIndex((p) => p.id === activePage);

    // If dropping at root level
    if (!targetId) {
      // Remove if it's an existing element being moved
      if (draggedItem.isExisting) {
        newPages[pageIndex].elements = removeElementById(
          newPages[pageIndex].elements,
          draggedItem.id
        );
      }

      // Add to root level
      newPages[pageIndex].elements.push({
        ...draggedItem,
        isExisting: undefined,
      });
    }
    // If dropping inside another element
    else {
      const updatedElements = [...newPages[pageIndex].elements];

      // Find the target and update its children
      const addToTarget = (elements) => {
        return elements.map((el) => {
          if (el.id === targetId) {
            // Only add if target accepts children
            if (el.acceptsChildren) {
              return {
                ...el,
                children: [
                  ...(el.children || []),
                  { ...draggedItem, isExisting: undefined },
                ],
              };
            }
            return el;
          }

          if (el.children && el.children.length > 0) {
            return {
              ...el,
              children: addToTarget(el.children),
            };
          }

          return el;
        });
      };

      // Remove the element from its original position if it's being moved
      if (draggedItem.isExisting) {
        const elementsWithoutDragged = removeElementById(
          updatedElements,
          draggedItem.id
        );
        newPages[pageIndex].elements = addToTarget(elementsWithoutDragged);
      } else {
        newPages[pageIndex].elements = addToTarget(updatedElements);
      }
    }

    setPages(newPages);
    setDraggedItem(null);
    setDropTarget(null);
    setCanDrop(false);
  };

  // Remove element by ID
  const removeElementById = (elements, id) => {
    return elements.filter((el) => {
      if (el.id === id) return false;

      if (el.children && el.children.length > 0) {
        el.children = removeElementById(el.children, id);
      }

      return true;
    });
  };

  // Delete selected element
  const deleteSelectedElement = () => {
    if (!selectedElement) return;

    const newPages = [...pages];
    const pageIndex = newPages.findIndex((p) => p.id === activePage);
    newPages[pageIndex].elements = removeElementById(
      newPages[pageIndex].elements,
      selectedElement
    );

    setPages(newPages);
    setSelectedElement(null);
  };

  // Handle clicking on an element to select it
  const handleElementClick = (e, elementId) => {
    e.stopPropagation();
    setSelectedElement(elementId);
  };

  // Update element properties
  const updateElementProperty = (propertyName, value) => {
    if (!selectedElement) return;

    const newPages = [...pages];
    const pageIndex = newPages.findIndex((p) => p.id === activePage);

    const updateElementInTree = (elements) => {
      return elements.map((el) => {
        if (el.id === selectedElement) {
          return { ...el, [propertyName]: value };
        }

        if (el.children && el.children.length > 0) {
          return { ...el, children: updateElementInTree(el.children) };
        }

        return el;
      });
    };

    newPages[pageIndex].elements = updateElementInTree(
      newPages[pageIndex].elements
    );
    setPages(newPages);
  };

  // Get component definition by component name
  const getComponentDefinition = (componentName) => {
    return (
      componentTypes.find((comp) => comp.component === componentName) || null
    );
  };

  // Render element tree recursively
  const renderElement = (element) => {
    const isSelected = selectedElement === element.id;
    const isDropTarget = dropTarget === element.id;

    // Get the component definition
    const componentDef = getComponentDefinition(element.component);
    if (!componentDef) return null;

    let borderClass = "";
    if (isSelected) {
      borderClass = "border-2 border-blue-500";
    } else if (isDropTarget) {
      borderClass = canDrop
        ? "border-2 border-green-500"
        : "border-2 border-red-500";
    } else {
      borderClass = "border border-gray-200 border-dashed";
    }

    // Combine classes
    const combinedClasses = `${element.tailwind} ${borderClass} relative`;

    // Create props for the component
    const componentProps = {
      className: combinedClasses,
      onClick: (e) => handleElementClick(e, element.id),
      draggable: true,
      onDragStart: (e) => handleElementDragStart(e, element.id),
      onDragOver: (e) => handleDragOver(e, element.id),
      onDrop: (e) => handleDrop(e, element.id),
      content: element.content,
      children:
        element.children && element.children.length > 0 ? (
          <Fragment>
            {element.children.map((child) => renderElement(child))}
          </Fragment>
        ) : null,
    };

    return (
      <div key={element.id} className="relative">
        {componentDef.render(componentProps)}

        {/* Component type label */}
        <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs px-1 opacity-50">
          {element.component}
        </div>
      </div>
    );
  };

  // Convert the current state to JSON
  const getJSON = () => {
    // Create a clean version without render functions
    const cleanPages = pages.map((page) => ({
      ...page,
      elements: cleanElements(page.elements),
    }));

    return JSON.stringify(cleanPages, null, 2);
  };

  // Remove render functions from the JSON output
  const cleanElements = (elements) => {
    return elements.map((el) => {
      const cleanEl = { ...el };
      delete cleanEl.render;

      if (cleanEl.children && cleanEl.children.length > 0) {
        cleanEl.children = cleanElements(cleanEl.children);
      }

      return cleanEl;
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar - components */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Components</h2>

        {componentTypes.map((component, index) => (
          <div
            key={index}
            className="p-2 mb-2 bg-gray-100 border border-gray-300 rounded cursor-move"
            draggable
            onDragStart={() => handleDragStart(component)}
          >
            {component.name}
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar with pages */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex space-x-2 mb-2">
            {pages.map((page) => (
              <button
                key={page.id}
                className={`px-3 py-1 rounded ${
                  activePage === page.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setActivePage(page.id)}
              >
                {page.name}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-200"
              onClick={() => {
                const newPage = {
                  id: generateId("page"),
                  name: `Page ${pages.length + 1}`,
                  elements: [],
                };
                setPages([...pages, newPage]);
                setActivePage(newPage.id);
              }}
            >
              + Add Page
            </button>
          </div>

          {selectedElement && (
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 rounded bg-red-500 text-white"
                onClick={deleteSelectedElement}
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>

        {/* Canvas area */}
        <div
          className="flex-1 bg-gray-200 p-4 overflow-auto"
          onDragOver={handlePageDragOver}
          onDrop={(e) => handleDrop(e, null)}
          onClick={() => setSelectedElement(null)}
        >
          <div className="bg-white min-h-full rounded shadow p-4">
            {currentPage.elements.map((element) => renderElement(element))}

            {currentPage.elements.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 p-8 text-center text-gray-500">
                Drag components here to build your page
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right sidebar - properties */}
      <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>

        {selectedElement ? (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Tailwind Classes
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={
                  findElementById(currentPage.elements, selectedElement)
                    ?.tailwind || ""
                }
                onChange={(e) =>
                  updateElementProperty("tailwind", e.target.value)
                }
              />
            </div>

            {findElementById(currentPage.elements, selectedElement)?.content !==
              undefined && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={
                    findElementById(currentPage.elements, selectedElement)
                      ?.content || ""
                  }
                  onChange={(e) =>
                    updateElementProperty("content", e.target.value)
                  }
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-1 mb-4">
              {[
                "p-2",
                "p-4",
                "m-2",
                "m-4",
                "rounded",
                "shadow",
                "text-center",
                "font-bold",
              ].map((cls) => (
                <button
                  key={cls}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  onClick={() => {
                    const element = findElementById(
                      currentPage.elements,
                      selectedElement
                    );
                    if (element) {
                      const classes = element.tailwind.split(" ");
                      if (classes.includes(cls)) {
                        updateElementProperty(
                          "tailwind",
                          classes.filter((c) => c !== cls).join(" ")
                        );
                      } else {
                        updateElementProperty(
                          "tailwind",
                          [...classes, cls].join(" ")
                        );
                      }
                    }
                  }}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">
            Select an element to edit its properties
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-md font-semibold mb-2">JSON Output</h3>
          <button
            className="w-full mb-2 px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => console.log(getJSON())}
          >
            Log JSON to Console
          </button>
          <div className="p-2 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-48">
            {getJSON()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;

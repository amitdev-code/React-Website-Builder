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
        <div className="z-2 h-screen bg-white-500 border-2 border-dashed border-indigo-600 rounded-lg m-1">
          {builderType === 0 && (
            <div className="overflow-y-auto bg-white">
              {/* <div>
                <div
                  className="relative pt-16 pb-32 flex content-center items-center justify-center"
                  style={{ minHeight: "75vh" }}
                >
                  <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80")',
                    }}
                  >
                    <span
                      id="blackOverlay"
                      className="w-full h-full absolute opacity-75 bg-black"
                    />
                  </div>
                  <div className="container relative mx-auto">
                    <div className="items-center flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <div className="pr-12">
                          <h1 className="text-white font-semibold text-5xl">
                            Your story starts with us.
                          </h1>
                          <p className="mt-4 text-lg text-gray-300">
                            This is a simple example of a Landing Page you can
                            build using Tailwind Starter Kit. It features
                            multiple CSS components based on the Tailwindcss
                            design system.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
                    style={{ height: 70 }}
                  >
                    <svg
                      className="absolute bottom-0 overflow-hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      version="1.1"
                      viewBox="0 0 2560 100"
                      x={0}
                      y={0}
                    >
                      <polygon
                        className="text-gray-300 fill-current"
                        points="2560 0 2560 100 0 100"
                      />
                    </svg>
                  </div>
                </div>
                <section className="pb-20 bg-gray-300 -mt-24">
                  <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                      <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                          <div className="px-4 py-5 flex-auto">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                              <i className="fas fa-award" />
                            </div>
                            <h6 className="text-xl font-semibold">
                              Awarded Agency
                            </h6>
                            <p className="mt-2 mb-4 text-gray-600">
                              Divide details about your product or agency work
                              into parts. A paragraph describing a feature will
                              be enough.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-4/12 px-4 text-center">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                          <div className="px-4 py-5 flex-auto">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                              <i className="fas fa-retweet" />
                            </div>
                            <h6 className="text-xl font-semibold">
                              Free Revisions
                            </h6>
                            <p className="mt-2 mb-4 text-gray-600">
                              Keep you user engaged by providing meaningful
                              information. Remember that by this time, the user
                              is curious.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                          <div className="px-4 py-5 flex-auto">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                              <i className="fas fa-fingerprint" />
                            </div>
                            <h6 className="text-xl font-semibold">
                              Verified Company
                            </h6>
                            <p className="mt-2 mb-4 text-gray-600">
                              Write a few lines about each one. A paragraph
                              describing a feature will be enough. Keep you user
                              engaged!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center mt-32">
                      <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                        <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-100">
                          <i className="fas fa-user-friends text-xl" />
                        </div>
                        <h3 className="text-3xl mb-2 font-semibold leading-normal">
                          Working with us is a pleasure
                        </h3>
                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                          Don't let your uses guess by attaching tooltips and
                          popoves to any element. Just make sure you enable them
                          first via JavaScript.
                        </p>
                        <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
                          The kit comes with three pre-built pages to help you
                          get started faster. You can change the text and images
                          and you're good to go. Just make sure you enable them
                          first via JavaScript.
                        </p>
                        <a
                          href="https://www.creative-tim.com/learning-lab/tailwind-starter-kit#/presentation"
                          className="font-bold text-gray-800 mt-8"
                        >
                          Check Tailwind Starter Kit!
                        </a>
                      </div>
                      <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
                          <img
                            alt="..."
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                            className="w-full align-middle rounded-t-lg"
                          />
                          <blockquote className="relative p-8 mb-4">
                            <svg
                              preserveAspectRatio="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 583 95"
                              className="absolute left-0 w-full block"
                              style={{ height: 95, top: "-94px" }}
                            >
                              <polygon
                                points="-30,95 583,95 583,65"
                                className="text-pink-600 fill-current"
                              />
                            </svg>
                            <h4 className="text-xl font-bold text-white">
                              Top Notch Services
                            </h4>
                            <p className="text-md font-light mt-2 text-white">
                              The Arctic Ocean freezes every winter and much of
                              the sea-ice then thaws every summer, and that
                              process will continue whatever happens.
                            </p>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="relative py-20">
                  <div
                    className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                    style={{ height: 80 }}
                  >
                    <svg
                      className="absolute bottom-0 overflow-hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      version="1.1"
                      viewBox="0 0 2560 100"
                      x={0}
                      y={0}
                    >
                      <polygon
                        className="text-white fill-current"
                        points="2560 0 2560 100 0 100"
                      />
                    </svg>
                  </div>
                  <div className="container mx-auto px-4">
                    <div className="items-center flex flex-wrap">
                      <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                        <img
                          alt="..."
                          className="max-w-full rounded-lg shadow-lg"
                          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        />
                      </div>
                      <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                        <div className="md:pr-12">
                          <div className="text-pink-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-pink-300">
                            <i className="fas fa-rocket text-xl" />
                          </div>
                          <h3 className="text-3xl font-semibold">
                            A growing company
                          </h3>
                          <p className="mt-4 text-lg leading-relaxed text-gray-600">
                            The extension comes with three pre-built pages to
                            help you get started faster. You can change the text
                            and images and you're good to go.
                          </p>
                          <ul className="list-none mt-6">
                            <li className="py-2">
                              <div className="flex items-center">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                    <i className="fas fa-fingerprint" />
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-gray-600">
                                    Carefully crafted components
                                  </h4>
                                </div>
                              </div>
                            </li>
                            <li className="py-2">
                              <div className="flex items-center">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                    <i className="fab fa-html5" />
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-gray-600">
                                    Amazing page examples
                                  </h4>
                                </div>
                              </div>
                            </li>
                            <li className="py-2">
                              <div className="flex items-center">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                                    <i className="far fa-paper-plane" />
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-gray-600">
                                    Dynamic components
                                  </h4>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="pt-20 pb-48">
                  <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center text-center mb-24">
                      <div className="w-full lg:w-6/12 px-4">
                        <h2 className="text-4xl font-semibold">
                          Here are our heroes
                        </h2>
                        <p className="text-lg leading-relaxed m-4 text-gray-600">
                          According to the National Oceanic and Atmospheric
                          Administration, Ted, Scambos, NSIDClead scentist, puts
                          the potentially record maximum.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                        <div className="px-6">
                          <img
                            alt="..."
                            src="./assets/img/team-1-800x800.jpg"
                            className="shadow-lg rounded-full max-w-full mx-auto"
                            style={{ maxWidth: 120 }}
                          />
                          <div className="pt-6 text-center">
                            <h5 className="text-xl font-bold">Ryan Tompson</h5>
                            <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                              Web Developer
                            </p>
                            <div className="mt-6">
                              <button
                                className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-twitter" />
                              </button>
                              <button
                                className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-facebook-f" />
                              </button>
                              <button
                                className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-dribbble" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                        <div className="px-6">
                          <img
                            alt="..."
                            src="./assets/img/team-2-800x800.jpg"
                            className="shadow-lg rounded-full max-w-full mx-auto"
                            style={{ maxWidth: 120 }}
                          />
                          <div className="pt-6 text-center">
                            <h5 className="text-xl font-bold">Romina Hadid</h5>
                            <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                              Marketing Specialist
                            </p>
                            <div className="mt-6">
                              <button
                                className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-google" />
                              </button>
                              <button
                                className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-facebook-f" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                        <div className="px-6">
                          <img
                            alt="..."
                            src="./assets/img/team-3-800x800.jpg"
                            className="shadow-lg rounded-full max-w-full mx-auto"
                            style={{ maxWidth: 120 }}
                          />
                          <div className="pt-6 text-center">
                            <h5 className="text-xl font-bold">Alexa Smith</h5>
                            <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                              UI/UX Designer
                            </p>
                            <div className="mt-6">
                              <button
                                className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-google" />
                              </button>
                              <button
                                className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-twitter" />
                              </button>
                              <button
                                className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-instagram" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                        <div className="px-6">
                          <img
                            alt="..."
                            src="./assets/img/team-4-470x470.png"
                            className="shadow-lg rounded-full max-w-full mx-auto"
                            style={{ maxWidth: 120 }}
                          />
                          <div className="pt-6 text-center">
                            <h5 className="text-xl font-bold">Jenna Kardi</h5>
                            <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                              Founder and CEO
                            </p>
                            <div className="mt-6">
                              <button
                                className="bg-pink-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-dribbble" />
                              </button>
                              <button
                                className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-google" />
                              </button>
                              <button
                                className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-twitter" />
                              </button>
                              <button
                                className="bg-gray-800 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                              >
                                <i className="fab fa-instagram" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="pb-20 relative block bg-gray-900">
                  <div
                    className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
                    style={{ height: 80 }}
                  >
                    <svg
                      className="absolute bottom-0 overflow-hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      version="1.1"
                      viewBox="0 0 2560 100"
                      x={0}
                      y={0}
                    >
                      <polygon
                        className="text-gray-900 fill-current"
                        points="2560 0 2560 100 0 100"
                      />
                    </svg>
                  </div>
                  <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
                    <div className="flex flex-wrap text-center justify-center">
                      <div className="w-full lg:w-6/12 px-4">
                        <h2 className="text-4xl font-semibold text-white">
                          Build something
                        </h2>
                        <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                          Put the potentially record low maximum sea ice extent
                          tihs year down to low ice. According to the National
                          Oceanic and Atmospheric Administration, Ted, Scambos.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap mt-12 justify-center">
                      <div className="w-full lg:w-3/12 px-4 text-center">
                        <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                          <i className="fas fa-medal text-xl" />
                        </div>
                        <h6 className="text-xl mt-5 font-semibold text-white">
                          Excelent Services
                        </h6>
                        <p className="mt-2 mb-4 text-gray-500">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                      </div>
                      <div className="w-full lg:w-3/12 px-4 text-center">
                        <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                          <i className="fas fa-poll text-xl" />
                        </div>
                        <h5 className="text-xl mt-5 font-semibold text-white">
                          Grow your market
                        </h5>
                        <p className="mt-2 mb-4 text-gray-500">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                      </div>
                      <div className="w-full lg:w-3/12 px-4 text-center">
                        <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                          <i className="fas fa-lightbulb text-xl" />
                        </div>
                        <h5 className="text-xl mt-5 font-semibold text-white">
                          Launch time
                        </h5>
                        <p className="mt-2 mb-4 text-gray-500">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="relative block py-24 lg:pt-0 bg-gray-900">
                  <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
                          <div className="flex-auto p-5 lg:p-10">
                            <h4 className="text-2xl font-semibold">
                              Want to work with us?
                            </h4>
                            <p className="leading-relaxed mt-1 mb-4 text-gray-600">
                              Complete this form and we will get back to you in
                              24 hours.
                            </p>
                            <div className="relative w-full mb-3 mt-8">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="full-name"
                              >
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Full Name"
                                style={{ transition: "all 0.15s ease 0s" }}
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="email"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Email"
                                style={{ transition: "all 0.15s ease 0s" }}
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                htmlFor="message"
                              >
                                Message
                              </label>
                              <textarea
                                rows={4}
                                cols={80}
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Type a message..."
                                defaultValue={""}
                              />
                            </div>
                            <div className="text-center mt-6">
                              <button
                                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all 0.15s ease 0s" }}
                              >
                                Send Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div> */}
            </div>
          )}
          {builderType === 1 && <div>JSON BUILDER</div>}
        </div>
      </main>
      <aside
        id="default-sidebar"
        className={`fixed top-0 right-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          toggleStyleEditSidebar ? "" : "hidden"
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

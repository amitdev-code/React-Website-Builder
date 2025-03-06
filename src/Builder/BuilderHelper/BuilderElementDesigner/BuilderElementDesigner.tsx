import React, { Fragment } from 'react'
import { useBuilder } from '../../../context/BuilderContext'

const BuilderElementDesigner = () => {

    const {styleEditSidebar} = useBuilder()

    return (
        <Fragment>
            <aside
                id="default-sidebar"
                className={`fixed top-0 right-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0 ${styleEditSidebar ? "" : "hidden"
                    }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    Left Sidebar
                </div>
            </aside>
        </Fragment>
    )
}

export default BuilderElementDesigner
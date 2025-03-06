import { Icon } from "@iconify/react"
import { Fragment } from "react/jsx-runtime"

const JustifyAroundFlexBox = () => {
  return (
    <Fragment>
        <div
          className="flex flex-1/2 flex-wrap p-3 items-center justify-around border-2 border-dashed rounded-lg border-indigo-400 dark:border-gray-700 cursor-grab"
          draggable="true"
        >
          <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
            <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
            <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
    </Fragment>
  )
}

export default JustifyAroundFlexBox
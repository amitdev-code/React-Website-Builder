import { Icon } from '@iconify/react'
import { Fragment } from 'react'

const FlexBox = () => {
  return (
    <Fragment>
      <div
          className="flex flex-wrap p-3 items-center justify-center">
          <div className="border-2 border-dashed rounded-lg border-indigo-400 p-3">
            <Icon icon={"bx:bx-plus"} className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
    </Fragment>
  )
}

export default FlexBox
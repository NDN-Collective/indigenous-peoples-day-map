import React, {FunctionComponent, MouseEventHandler} from 'react'

interface IReturnButton {
  onClose: MouseEventHandler
}

const ReturnButton: FunctionComponent<IReturnButton> = ({
  onClose,
}) => (
  <div className="mt-5 sm:mt-6">
    <span className="flex w-full rounded-md shadow-sm">
      <button
        onClick={onClose}
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadown-sm hover:shadow-xl hover:bg-blue-darker hover:text-white focus:outline-none focus:border-vibe-green focus:shadow-outline sm:text-sm sm:leading-5">
        Return to map
      </button>
    </span>
  </div>
)

interface IModal {
  onClose: MouseEventHandler
  copy: string
}

const Modal: FunctionComponent<IModal> = ({onClose, copy}) => (
  <div className={`absolute top-0 bottom-0 left-0 right-0 z-30`}>
    <div className="inset-x-0 bottom-0 flex items-center justify-center w-full h-full p-0 px-4 pb-6">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <div className="z-30 px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl pointer-events-auto sm:max-w-sm sm:w-full sm:p-6">
        <div>
          <div className="flex items-center justify-center w-16 h-16 mx-auto text-white rounded-full bg-blue-darker">
            <svg
              className="w-6 h-6 text-white"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="mt-3 text-center sm:mt-5">
            <h3 className="font-sans text-xl font-medium leading-6 text-gray-900">
              {copy}
            </h3>

            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-700">
                Thanks for your interest in Indigenous Peoples Day
                2020.
              </p>
            </div>
          </div>
        </div>

        <ReturnButton onClose={onClose} />
      </div>
    </div>
  </div>
)

export {Modal as default}

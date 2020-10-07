import React from 'react'

const Overlay = ({events, event}) =>
<div className="fixed inset-x-0 bottom-0 z-10 pb-2 sm:pb-5">
  <div className="max-w-screen-xl px-2 mx-auto sm:px-6 lg:px-8">
    <div className="p-2 rounded-lg shadow-lg bg-red sm:p-3">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-1 w-0">
          <span className="flex p-2 bg-white rounded-lg">
            <svg className="w-6 h-6 text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </span>

          <p className="ml-3 font-medium text-white truncate">
            <span className="md:hidden">
              {event?.name}
            </span>
            <span className="hidden md:inline">
              {event?.name}
            </span>
          </p>
        </div>
        <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
          <div className="rounded-md shadow-sm">
            <a href="#" className="flex items-center justify-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-white border border-transparent rounded-md text-red hover:text-red-darker focus:outline-none focus:shadow-outline">
              Learn more
            </a>
          </div>
        </div>
        <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
          <button type="button" className="flex p-2 -mr-1 transition duration-150 ease-in-out rounded-md hover:bg-white hover:text-red focus:outline-none focus:text-red" aria-label="Dismiss">
            <svg className="w-6 h-6 text-white hover:text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  export {Overlay as default}

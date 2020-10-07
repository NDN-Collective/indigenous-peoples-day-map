import React from 'react'

const Overlay = ({event}) =>
  event ? (
  <div className="fixed inset-x-0 bottom-0 z-10 pb-2 transition duration-500 ease-in-out sm:pb-5">
    <div className="max-w-screen-xl px-2 mx-auto sm:px-6 lg:px-8">
      <div className="p-2 rounded-lg shadow-lg bg-red sm:p-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-1 w-0">
            <span className="flex p-2 bg-white rounded-lg">
              <svg className="w-6 h-6 text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </span>

            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">
                {event?.event_name}
              </span>

              <span className="hidden md:inline">
                {event?.event_name}
              </span>
            </p>
          </div>
          <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
            <button type="button" className="flex p-2 -mr-1 transition duration-150 ease-in-out bg-white rounded-md text-red hover:bg-white hover:text-red focus:outline-none focus:text-red" aria-label="Join">
              Join this event
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  ) : <></>

  export {Overlay as default}

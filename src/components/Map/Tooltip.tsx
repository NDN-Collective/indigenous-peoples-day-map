import React from "react"

const Tooltip = ({event, showInfo}) =>
  <div id={`tooltip`} className="px-2">
    {event?.name && <h2 className="mt-4 mb-2 text-lg font-medium tracking-wider text-center uppercase">{event.name}</h2>}
    <button
      onClick={() => showInfo()}
      type="submit"
      className="px-6 py-2 mt-4 mb-2 text-lg text-center transition duration-200 border-0 rounded text-white-bright transition-ease-in-out bg-red focus:outline-none hover:bg-red-darker">
      Get more info and sign up
    </button>
  </div>

export {Tooltip as default}

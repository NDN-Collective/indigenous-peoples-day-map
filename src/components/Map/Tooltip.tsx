import React from "react"

const Tooltip = ({name,description}) =>
  <div id={`tooltip`} className="px-2">
    {name && <h2 className="mt-2 mb-4 text-xl">{name}</h2>}
    {description && <p className="text-lg">{description}</p>}
    <button
      type="submit"
      className="px-6 py-2 mt-4 text-lg text-center transition duration-200 border-0 rounded text-white-bright transition-ease-in-out bg-red focus:outline-none hover:bg-red-darker">
      Sign up
    </button>
  </div>

export {Tooltip as default}

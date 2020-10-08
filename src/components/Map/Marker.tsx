import React from 'react'

const Mark = ({event}) => (
  <div
    id={`marker`}
    className="relative z-20 px-4 py-2 text-lg transition border rounded text-red border-red hover:bg-red hover:text-white transition-400">
    ✊🏾 ${event.event_name}
  </div>
)

export {Mark as default}

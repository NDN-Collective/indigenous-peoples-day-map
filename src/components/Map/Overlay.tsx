import React from 'react'

const Overlay = ({lng, lat, zoom}) =>
  <div className="absolute top-0 left-0 z-10 inline-block p-4 font-bold margin-4">
    <div className="p-4 text-white bg-black bg-opacity-75 rounded">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
  </div>

  export {Overlay as default}

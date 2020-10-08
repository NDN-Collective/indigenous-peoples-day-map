import React from 'react'
import {Popup} from '../../lib'
import Styled from '@emotion/styled'

const StyledPopup = Styled(Popup)`
  > .mapboxgl-popup-content {
    background: red;
    text: white;
  }

  &.mapboxgl-popup-anchor {
    &-right > .mapboxgl-popup-tip {
      border-left-color: red;
    }

    &-left > .mapboxgl-popup-tip {
      border-right-color: red;
    }

    &-top > .mapboxgl-popup-tip {
      border-bottom-color: red;
    }

    &-top-left > .mapboxgl-popup-tip {
      border-bottom-color: red;
      border-left: none;
    }

    &-top-right > .mapboxgl-popup-tip {
      border-bottom-color: red;
      border-right: none;
    }

    &-bottom > .mapboxgl-popup-tip {
      border-top-color: red;
    }
  }

  > div {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transition-duration: 0.4s;
    transition-property: all;

    &:hover {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      transition-duration: 0.4s;
      transition-property: all;
    }
  }
`

const Tooltip = ({event, showInfo, coordinates, ...props}) => (
  <StyledPopup coordinates={coordinates} {...props}>
    <div
      id={`tooltip`}
      className="z-10 items-center content-center justify-center max-w-sm px-0 text-white bg-none align-center">
      {event?.event_name && (
        <div className="flex flex-col flex-wrap">
          <span className="mt-4 mb-2 text-2xl font-medium tracking-wider text-center uppercase">
            {event.event_name}
          </span>

          {event.event_description && (
            <span className="mt-2 font-mono italic text-center">
              {event.event_description}
            </span>
          )}

          {event.event_venue && (
            <span className="mt-4 mb-2 font-mono font-thin tracking-wider text-center text-md">
              Location: {event.event_venue}
            </span>
          )}

          {event.event_date && (
            <span className="mt-2 font-mono text-center">
              Date: {event.event_date}
            </span>
          )}
        </div>
      )}

      <button
        onClick={() => showInfo()}
        type="submit"
        className="justify-center w-full px-6 py-2 mx-auto mt-4 mb-2 text-lg text-center transition duration-200 border-0 rounded bg-white-bright align-self-center text-red transition-ease-in-out focus:outline-none">
        Sign up
      </button>
    </div>
  </StyledPopup>
)

export {Tooltip as default}

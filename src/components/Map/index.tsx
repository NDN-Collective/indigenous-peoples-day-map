import React, {FunctionComponent, useState, useEffect} from 'react'

import axios from 'axios'
import ReactMapboxGl, {Marker, Popup} from 'lib'

import Mark from './Marker'
import Tooltip from './Tooltip'
import Form from './../Form'
import Overlay from './Overlay'
import Slide from './Slide'
import Card from './Card'

enum INITIAL {
  lng = -103.1144,
  lat = 44.0039,
  zoom = 9.5,
}

const mapStyle = {
  minHeight: '100vh',
  minWidth: '100vw',
}

function useEvents() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    events?.length <= 0 &&
      (async () => {
        const {data, status} = await axios.get(
          '/.netlify/functions/google-sheet-fn/',
        )
        setStatus(status)
        setEvents(data)
      })()
  }, [])

  return events
}

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoia2VsbHltZWFycyIsImEiOiJDRWJGSnY0In0.chvkNAOsFpqhjbjcOIBZOA',
  injectCSS: false,
})

const Mapbox: FunctionComponent<any> = () => {
  const events = useEvents()

  const [zoom, setZoom] = useState(INITIAL.zoom)

  const [event, setEvent] = useState(null)
  const [create, setCreate] = useState(null)
  const [info, setInfo] = useState(false)

  const [center, setCenter] = useState<[number, number]>([
    INITIAL.lng,
    INITIAL.lat,
  ])

  /* const click = (map: any, evt: any) => {
    const coordinates = Object.values(evt.lngLat)
    setCenter(coordinates as [number, number])
    event && setEvent(null)
    create && setCreate(null)
    setCreate({
      center: coordinates,
    })
  } */

  const eventClick = id => {
    setCreate(null)
    setEvent(events[id])
  }

  const showInfo = () => {
    setInfo(info ? false : true)
  }

  return (
    <>
      <Overlay events={events} event={event} />
      <Slide />
      <Map
        center={center}
        movingMethod="flyTo"
        style="mapbox://styles/kellymears/ckfwxtc3y05m119pku6ud8zbn"
        containerStyle={mapStyle}
        pitch={[60]}
        bearing={[-60]}>
        <>
          {events.map(
            (event, id) =>
              event.published && (
                <Marker
                  key={id}
                  onClick={() => eventClick(id)}
                  coordinates={[event.longitude, event.latitude]}>
                  <Mark name={event.name} />
                </Marker>
              ),
          )}

          {event && (
            <Popup
              className="event-popup"
              key={event.id}
              offset={[0, -20]}
              coordinates={[event.longitude, event.latitude]}>
              <Tooltip
                showInfo={showInfo}
                event={event} />
            </Popup>
          )}

          {create && (
            <Popup
              className="create-popup"
              key={'create'}
              offset={[0, -20]}
              coordinates={create.center}>
              <Form
                id={events.length + 1}
                latitude={create.center[1]}
                longitude={create.center[0]}
              />
            </Popup>
          )}

          {info && <Card setInfo={setInfo} event={event} />}
        </>
      </Map>
    </>
  )
}

export {Mapbox as default}

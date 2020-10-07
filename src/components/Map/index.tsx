import React, {FunctionComponent, useState} from 'react'
import ReactMapboxGl, {Popup, Layer, Feature} from 'lib'
import mapboxgl from 'mapbox-gl'
import Tooltip from './Tooltip'
import Form from './../Form'
import Overlay from './Overlay'
import Slide from './Slide'
import Card from './Card'

let MapboxGeocoder;

enum INITIAL {
  lng = -103.1144,
  lat = 44.0039,
  zoom = 9.5,
}

const DOT_SIZE = 200

const mapStyle = {
  minHeight: '100vh',
  minWidth: '100vw',
}

const accessToken =
  'pk.eyJ1Ijoia2VsbHltZWFycyIsImEiOiJDRWJGSnY0In0.chvkNAOsFpqhjbjcOIBZOA'

const Map = ReactMapboxGl({
  accessToken,
  injectCSS: false,
})

const Mapbox: FunctionComponent<any> = ({events}) => {
  const [event, setEvent] = useState(null)
  const [create, setCreate] = useState(null)
  const [info, setInfo] = useState(false)
  const [place, setPlace] = useState(false)

  const [center, setCenter] = useState<[number, number]>([
    INITIAL.lng,
    INITIAL.lat,
  ])

  const init = map => {
    map.addControl(
      new MapboxGeocoder({
        accessToken,
        mapboxgl,
        autocomplete: true,
        proximity: {
          longitude: -103.1144,
          latitude: 44.0039,
        },
        limit: 20,
        bbox: [-103.38242766899484,43.93527325315776,-102.98740537196197,44.21292531719186],
        localGeocoder: function (query) {
          return events
            .map((props, id) => ({
              type: 'Feature',
              properties: {
                title: props?.event_name ?? '',
                description: props?.event_description ?? '',
              },
              geometry: {
                coordinates: [props.event_longitude, props.event_latitude],
                type: 'Point',
              },
            }))
            .filter(feature => {
              return feature.properties.title
                .toLowerCase()
                .search(query.toLowerCase()) !== -1
            })
            .map(feature => ({
              ...event,
              'place_name': feature.properties.title,
            }))
        },
      }),
    )

    map.addImage(
      'pulsing-dot',
      {
        width: DOT_SIZE,
        height: DOT_SIZE,
        data: new Uint8Array(DOT_SIZE * DOT_SIZE * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
          var canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height

          this.context = canvas.getContext('2d')
        },

        render: function () {
          var duration = 1000
          var t = (performance.now() % duration) / duration

          var radius = (DOT_SIZE / 2) * 0.3
          var outerRadius = (DOT_SIZE / 2) * 0.7 * t + radius
          var context = this.context

          context.clearRect(0, 0, this.width, this.height)
          context.beginPath()
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2,
          )
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
          context.fill()

          // draw inner circle
          context.beginPath()
          context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2,
          )
          context.fillStyle = 'rgba(255, 100, 100, 1)'
          context.strokeStyle = 'white'
          context.lineWidth = 2 + 4 * (1 - t)
          context.fill()
          context.stroke()

          // update this image's data with data from the canvas
          this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height,
          ).data

          map.triggerRepaint()

          return true
        },
      },
      {pixelRatio: 2},
    )

    return map
  }

  const eventClick = id => {
    setCreate(null)
    setEvent(events[id])
  }

  const showInfo = () => {
    setInfo(info ? false : true)
  }

  return (
    <>
      <Overlay event={event} />
      <Slide events={events} />
      <Map
        onStyleLoad={init}
        center={center}
        style="mapbox://styles/kellymears/ckfwxtc3y05m119pku6ud8zbn"
        containerStyle={mapStyle}
        pitch={[60]}
        bearing={[-60]}>
        <>
          {events?.length > 0 && (
            <Layer
              type="symbol"
              id="marker"
              layout={{'icon-image': 'pulsing-dot'}}>
              {events.map(
                (event, id) =>
                  event.event_latitude &&
                  event.event_longitude && (
                    <Feature
                      key={id}
                      properties={{
                        place_name: `✊🏾  ${event.event_name}`,
                        center: [event.event_longitude, event.event_latitude],
                      }}
                      coordinates={[event.event_longitude, event.event_latitude]}
                      onClick={() => eventClick(id)}
                    />
                  ),
              )}
            </Layer>
          )}

          {event && (
            <Popup
              className="event-popup"
              key={event.id}
              offset={[0, -20]}
              coordinates={[event.event_longitude, event.event_latitude]}>
              <Tooltip showInfo={showInfo} event={event} />
            </Popup>
          )}

          {create && (
            <Popup
              className="create-popup"
              key={'create'}
              offset={[0, -20]}
              coordinates={create.center}>
              <Form
                id={events?.length + 1}
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

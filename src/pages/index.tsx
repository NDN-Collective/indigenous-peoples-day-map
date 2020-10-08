import React, {FunctionComponent, useState, useEffect} from 'react'
import axios from 'axios'
import Map from 'components/Map'

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

        setEvents(
          data.filter(data => {
            data.event_latitude =
              data.event_latitude && parseFloat(data.event_latitude)
            data.event_longitude =
              data.event_longitude && parseFloat(data.event_longitude)

            return (
              data.published &&
              data.id &&
              typeof data.event_latitude == 'number' &&
              typeof data.event_longitude == 'number' &&
              data.event_latitude !== 0 &&
              data.event_longitude !== 0
            )
          }),
        )
      })()
  }, [])

  console.log(events)

  return events
}

const Loading: FunctionComponent = () => <span>loading</span>

const Index: FunctionComponent = () => {
  const events = useEvents()

  return events ? <Map events={events} /> : <Loading />
}

export {Index as default}

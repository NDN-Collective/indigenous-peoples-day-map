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
        setEvents(data.filter(data => data.published))
      })()
  }, [])

  return events
}

const Loading: FunctionComponent = () => (
  <span>loading</span>
)

const Index: FunctionComponent = () => {
  const events = useEvents()

  return events ? <Map events={events} /> : <Loading />
}

export {Index as default}

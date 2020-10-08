import moment from 'moment'
import Form from '../Form'

const Card = ({event, setInfo, setModal, setModalCopy}) => (
  <div className="absolute z-30 flex flex-col flex-wrap content-center justify-center w-full h-screen align-middle bg-black bg-opacity-75 justify-items-center">
    <div className="relative z-40 flex flex-col content-center justify-center mx-auto overflow-hidden align-middle bg-white rounded-lg shadow w-xl justify-items-center align-center justify-middle">
      <div className="p-2 bg-white border-b border-gray-200">
        <div className="p-2 border-gray-200">
          <CardHeader event={event} />
        </div>

        <div className="py-2 pr-2">
          <nav className="flex items-center justify-between bg-white">
            <div className="flex flex-col justify-between flex-1 sm:justify-start">
              <Form
                event={event}
                setModal={setModal}
                setModalCopy={setModalCopy}
                closeHandler={setInfo}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
)

const CardHeader = ({event}) => (
  <div className="px-2 py-2 bg-white border-b border-gray-200 sm:px-6">
    <div className="flex flex-col flex-wrap items-start justify-start -mt-4 -ml-4 sm:flex-no-wrap">
      <div className="mt-4 ml-4">
        <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900 uppercase">
          {event?.event_name}
        </h3>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          🏁 {event?.event_venue}
        </p>

        {event?.event_date && (
          <p className="mt-1 text-sm leading-5 text-gray-500">
            ⌚️{' '}
            {moment(event?.event_date).format('dddd, MMMM Do, ha')}
          </p>
        )}

        <p className="mt-1 text-sm leading-5 text-gray-500">
          🗺 {event?.event_street}, {event?.event_city},{' '}
          {event?.event_state}
        </p>

        <p className="my-3 text-sm leading-5 text-gray-700">
          {event?.event_description}
        </p>

        {event?.contact_public && (
          <p className="mt-1 leading-5 text-left text-gray-500 text-md">
            For more information, contact {event?.first_name}{' '}
            {event?.last_name} at {event?.email}
          </p>
        )}
      </div>
    </div>
  </div>
)

export default Card

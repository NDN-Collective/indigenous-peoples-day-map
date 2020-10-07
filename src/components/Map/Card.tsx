const Card = ({event, setInfo}) => (
  <div className="absolute z-30 flex flex-col flex-wrap content-center justify-center w-full h-screen align-middle bg-black bg-opacity-75 justify-items-center">
    <div className="relative z-40 flex flex-col content-center justify-center w-1/2 mx-auto overflow-hidden align-middle bg-white rounded-lg shadow justify-items-center align-center justify-middle">
      <div className="px-4 py-5 bg-white border-b border-gray-200 sm:px-6">
        <div className="px-4 py-5 border-gray-200 sm:px-6">
          <CardHeader event={event} />
        </div>

        <div className="px-4 py-4 sm:px-6">
          <CardFooter event={event}  setInfo={setInfo} />
        </div>
      </div>
    </div>
  </div>
)

const CardHeader = ({event}) => (
  <div className="px-4 py-5 bg-white border-b border-gray-200 sm:px-6">
    <div className="flex flex-col flex-wrap items-start justify-start -mt-4 -ml-4 sm:flex-no-wrap">
      <div className="mt-4 ml-4">
        <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900 uppercase">
          {event?.event_name}
        </h3>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          {event?.event_venue}
        </p>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          {event?.event_street}, {event?.event_city}, {event?.event_state}
        </p>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          {event?.event_date}
        </p>
      </div>

      <div className="justify-start mt-4 ml-4 text-left align-start align-items-start justify-items-start">
        <p className="mt-1 leading-5 text-left text-gray-500 text-md">
          {event?.event_description}
        </p>

        {event?.contact_public && (
          <p className="mt-1 leading-5 text-left text-gray-500 text-md">
            For more information, contact {event?.first_name} {event?.last_name} at {event?.email}
          </p>
        )}
      </div>
    </div>
  </div>
)

const CardFooter = ({event, setInfo}) => (
  <nav className="flex items-center justify-between py-3 bg-white">
    <div className="flex justify-between flex-1 sm:justify-start">
      <a
        onClick={() => setInfo(false)}
        href="#"
        className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700">
        Close
      </a>
      <span className="inline-flex ml-4 rounded-md shadow-sm">
        <button
          type="button"
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white border border-transparent rounded-md bg-red hover:bg-red-darker focus:outline-none focus:shadow-outline-indigo focus:border-red-darker active:bg-red-darker">
            Sign up
        </button>
      </span>
    </div>
  </nav>
)

export default Card

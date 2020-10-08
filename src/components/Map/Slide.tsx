import Datetime from 'react-datetime'
import React, {useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import * as Moment from 'moment'
import {v4} from 'uuid'

const Slide = ({events, setModal, setModalCopy}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="absolute left-0 z-10 p-2 button">
        <Add />
      </div>
      <Menu
        setModal={setModal}
        setModalCopy={setModalCopy}
        events={events}
        toggle={() => setOpen(!open)}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

const Menu = ({
  toggle,
  open,
  events,
  setModal,
  setOpen,
  setModalCopy,
}) => (
  <div
    className={`fixed inset-0 z-10 overflow-hidden transform transition ease-in-out duration-500 sm:duration-700 ${
      open ? 'translate-x-0' : 'translate-x-full'
    }`}>
    <div className="absolute inset-0 overflow-hidden">
      <section className="absolute inset-y-0 right-0 flex max-w-full lg:pl-16">
        <Panel
          setOpen={setOpen}
          setModal={setModal}
          setModalCopy={setModalCopy}
          events={events}
          toggle={toggle}
          open={open}
        />
      </section>
    </div>
  </div>
)

const Header = ({toggle}) => (
  <header className="px-4 py-6 space-y-1 bg-red sm:px-6">
    <div className="flex items-center justify-between space-x-3">
      <h2 className="text-lg font-medium leading-7 text-white">
        New Event
      </h2>

      <div className="flex items-center h-7">
        <button
          onClick={toggle}
          aria-label="Close panel"
          className="text-white transition duration-150 ease-in-out hover:text-white">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <div>
      <p className="text-sm leading-5 text-white">
        Get started with your event by filling in the information
        below.
      </p>
    </div>
  </header>
)

const accessToken =
  'pk.eyJ1Ijoia2VsbHltZWFycyIsImEiOiJDRWJGSnY0In0.chvkNAOsFpqhjbjcOIBZOA'

const Panel = ({
  toggle,
  setOpen,
  open,
  events,
  setModal,
  setModalCopy,
}) => {
  const [date, setDate] = useState<Moment.Moment | string>('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [publicContact, setPublicContact] = useState(false)

  const {register, handleSubmit, watch, errors} = useForm()

  const onSubmit = async data => {
    await axios({
      method: 'get',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        data.event_city,
      )},${encodeURIComponent(
        data.event_street_address,
      )},${encodeURIComponent(data.event_state)},${encodeURIComponent(
        data.event_zip,
      )},${encodeURIComponent(
        'United States',
      )}.json?types=address&access_token=${accessToken}`,
    })
      .then(res => {
        const primary = res?.data?.features?.[0]

        if (primary?.center) {
          setLongitude(primary.center[0])
          setLatitude(primary.center[1])
        }

        axios({
          method: 'post',
          url: `/.netlify/functions/google-sheet-fn`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            id: v4(),
            email: data.email ?? '',
            first_name: data.first_name ?? '',
            last_name: data.last_name ?? '',
            public_contact: publicContact ? 'TRUE' : 'FALSE',
            event_street: data.event_street_address ?? '',
            event_venue: data.event_venue ?? '',
            event_name: data.event_name ?? '',
            event_description: data.event_description ?? '',
            event_city: data.event_city ?? '',
            event_state: data.event_state ?? '',
            event_zip: data.event_zip ?? '',
            event_date: date,
            event_longitude: longitude,
            event_latitude: latitude,
          }),
        })
          .then(res => {
            if (res.status == 200) {
              console.log('woo')
            }

            setOpen(false)
            setModal(true)
            setModalCopy(
              `Thank you for submitting your event. Organizers will reach out if there are any questions. Otherwise, we'll let you know when the event is approved.`,
            )
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.error(err))
  }

  return (
    <div className={`w-screen max-w-md`}>
      <div className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
        <div className="flex-1 h-0 overflow-y-auto">
          <Header toggle={toggle} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-between flex-1">
              <div className="px-4 divide-y divide-gray-200 sm:px-6">
                <div className="pt-4 mt-4">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      About the event
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Help us promote your Indigenous Peoples Day
                      event by telling us more about it.
                    </p>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="event_name"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                      Event name
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex max-w-lg rounded-md shadow-sm">
                        <input
                          name="event_name"
                          id="event_name"
                          ref={register({required: true})}
                          className="flex-1 block w-full min-w-0 transition duration-150 ease-in-out rounded-none form-input rounded-r-md sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                    <label
                      htmlFor="event_venue"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                      Venue/location
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex max-w-lg rounded-md shadow-sm">
                        <input
                          name="event_venue"
                          id="event_venue"
                          ref={register({required: true})}
                          className="flex-1 block w-full min-w-0 transition duration-150 ease-in-out rounded-none form-input rounded-r-md sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="event_description"
                      className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                      Description
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="flex max-w-lg rounded-md shadow-sm">
                        <textarea
                          name="event_description"
                          id="event_description"
                          rows={3}
                          ref={register()}
                          className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"></textarea>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Write a few sentences about your event.
                      </p>
                    </div>
                  </div>

                  <label
                    htmlFor="about"
                    className="block mb-4 text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-4">
                    Date and time
                  </label>
                  <Datetime
                    value={date}
                    onChange={value => setDate(value)}
                    input={false}
                  />

                  <div className="mt-8 sm:col-span-6">
                    <label
                      htmlFor="street_address"
                      className="block text-sm font-medium leading-5 text-gray-700">
                      Street address
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        name="event_street_address"
                        id="event_street_address"
                        ref={register()}
                        className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>

                  <div className="mt-4 sm:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-5 text-gray-700">
                      City
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        name="event_city"
                        id="event_city"
                        ref={register()}
                        className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>

                  <div className="mt-4 sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-5 text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        name="event_state"
                        id="event_state"
                        ref={register()}
                        className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>

                  <div className="mt-4 sm:col-span-2">
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium leading-5 text-gray-700">
                      ZIP / Postal
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        name="event_zip"
                        id="event_zip"
                        ref={register()}
                        className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Coordinator
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Who is the point of contact for this event?
                    </p>
                  </div>
                  <div className="grid mt-6 mb-8 gap-y-6 gap-x-4">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-5 text-gray-700">
                        First name
                      </label>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          name="first_name"
                          ref={register({required: true})}
                          id="first_name"
                          className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium leading-5 text-gray-700">
                        Last name
                      </label>
                      <div className="mt-1 rounded-md shadow-sm">
                        <input
                          name="last_name"
                          ref={register({required: true})}
                          id="last_name"
                          className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-5 text-gray-700">
                        Email address
                      </label>
                      <div className="space-y-1">
                        <div className="relative rounded-md shadow-sm">
                          <input
                            name="email"
                            ref={register({required: true})}
                            id="email"
                            type="email"
                            className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block mb-8 text-sm font-medium leading-5 text-gray-700">
                      Is it okay to publish your name and email so
                      people can get in touch with you as the
                      coordinator?
                    </label>

                    <div className="flex-row w-full">
                      <span
                        role="checkbox"
                        tabIndex={0}
                        aria-checked={publicContact ? true : false}
                        onClick={() =>
                          setPublicContact(!publicContact)
                        }
                        className={`${
                          publicContact ? `bg-red` : `bg-transparent`
                        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}>
                        <span
                          aria-hidden="true"
                          className={`${
                            publicContact
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } relative inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow`}>
                          <span
                            className={`${
                              publicContact
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 flex items-center justify-center w-full h-full transition-opacity`}>
                            <svg
                              className="w-3 h-3 text-gray-400"
                              fill="none"
                              viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              publicContact
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 flex items-center justify-center w-full h-full transition-opacity`}>
                            <svg
                              className="w-3 h-3 text-red"
                              fill="currentColor"
                              viewBox="0 0 12 12">
                              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                            </svg>
                          </span>
                        </span>
                      </span>

                      <span className="relative mb-2 ml-8 bottom-1">
                        {publicContact ? 'Sure!' : 'No, thanks.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end flex-shrink-0 px-4 py-4 space-x-4">
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={toggle}
                  type="button"
                  className="px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                  Cancel
                </button>
              </span>
              <span className="inline-flex rounded-md shadow-sm">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-red hover:bg-red-darker focus:outline-none focus:border-red focus:shadow-outline-indigo active:bg-red">
                  Save
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const Add = props => {
  const fill = props.fill || 'currentColor'
  const secondaryfill = props.secondaryfill || fill
  const strokewidth = props.strokewidth || 1

  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-red hover:bg-red-darker focus:outline-none focus:border-red focus:shadow-outline-red-darker active:bg-red-darker">
        <svg
          className="relative mr-3 transition-all duration-300 cursor-pointer hover:transform hover:scale-150"
          height={'2em'}
          width={'2em'}
          viewBox="0 0 64 64">
          <g fill={secondaryfill}>
            <path d="M45,38A12,12,0,1,0,57,50,12,12,0,0,0,45,38Zm5,13H46v4a1,1,0,0,1-2,0V51H40a1,1,0,0,1,0-2h4V45a1,1,0,0,1,2,0v4h4a1,1,0,0,1,0,2Z" />
            <path
              d="M29,62a1,1,0,0,0,.707-.293c.22-.22,1.644-1.656,3.666-3.908A13.973,13.973,0,0,1,48.527,36.466C50.609,32.224,52,27.952,52,24.1,52,9.639,40.306,1,29,1S6,9.639,6,24.1C6,39.24,27.383,60.8,28.293,61.707A1,1,0,0,0,29,62ZM21,24a8,8,0,1,1,8,8A8,8,0,0,1,21,24Z"
              fill={fill}
            />
          </g>
        </svg>
        Add event
      </button>
    </span>
  )
}

export {Slide as default}

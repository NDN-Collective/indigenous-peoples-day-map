import {useState} from 'react'

const Slide = () => {
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <>
      <div
        onClick={toggle}
        className="absolute right-0 z-10 p-4 button">
        <Add />
      </div>
      <Menu toggle={toggle} open={open} />
    </>
  )
}

const Menu = ({toggle, open}) => (
  <div
    className={`fixed inset-0 z-10 overflow-hidden transform transition ease-in-out duration-500 sm:duration-700 ${
      open ? 'translate-x-full' : 'translate-x-0'
    }`}>
    <div className="absolute inset-0 overflow-hidden">
      <section className="absolute inset-y-0 right-0 flex max-w-full pl-16">
        <Panel toggle={toggle} open={open} />
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
          onClick={() => toggle()}
          aria-label="Close panel"
          className="text-white transition duration-150 ease-in-out hover:text-white">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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

const Panel = ({toggle, open}) => (
  <div className={`w-screen max-w-md`}>
    <div className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
      <div className="flex-1 h-0 overflow-y-auto">
        <Header toggle={toggle} />

        <div className="flex flex-col justify-between flex-1">
          <div className="px-4 divide-y divide-gray-200 sm:px-6">
            <div className="pt-6 pb-5 space-y-6">
              <div className="space-y-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-5 text-gray-900">
                  Event name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    name="title"
                    id="title"
                    className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-5 text-gray-900">
                  Event description
                </label>

                <div className="relative rounded-md shadow-sm">
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="project_name"
                  className="block text-sm font-medium leading-5 text-gray-900">
                  Email
                </label>

                <div className="relative rounded-md shadow-sm">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium leading-5 text-gray-900">
                  Event type
                </legend>

                <div className="space-y-5">
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center h-5">
                      <input
                        id="privacy_public"
                        aria-describedby="privacy_public_description"
                        type="radio"
                        name="privacy"
                        className="w-4 h-4 transition duration-150 ease-in-out text-red form-radio"
                      />
                    </div>

                    <div className="text-sm leading-5 pl-7">
                      <label
                        htmlFor="privacy_public"
                        className="font-medium text-gray-900">
                        Creative action
                      </label>
                      <p
                        id="privacy_public_description"
                        className="text-gray-500">
                        Artistic event.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="absolute flex items-center h-5">
                      <input
                        id="privacy_private-to-project"
                        aria-describedby="privacy_private-to-project_description"
                        type="radio"
                        name="privacy"
                        className="w-4 h-4 transition duration-150 ease-in-out text-red form-radio"
                      />
                    </div>
                    <div className="text-sm leading-5 pl-7">
                      <label
                        htmlFor="privacy_private-to-project"
                        className="font-medium text-gray-900">
                        Direct action.
                      </label>
                      <p
                        id="privacy_private-to-project_description"
                        className="text-gray-500">
                        March, rally, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="pt-4 pb-6 space-y-4">
              <div className="flex text-sm leading-5">
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-gray-500 transition duration-150 ease-in-out group hover:text-gray-900">
                  <svg
                    className="w-5 h-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Learn more about sharing</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end flex-shrink-0 px-4 py-4 space-x-4">
        <span className="inline-flex rounded-md shadow-sm">
          <button
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
    </div>
  </div>
)

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
          className="relative transition-all duration-300 cursor-pointer hover:transform hover:scale-150"
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
      </button>
    </span>
  )
}

export {Slide as default}

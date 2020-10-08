import React, {FunctionComponent, useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import Modal from 'components/Modal'
import {v4} from 'uuid'

type Inputs = {
  example: string
  exampleRequired: string
}

interface FormProps {
  event: any
  closeHandler: any
  setModal: any
  setModalCopy: any
}

const Form: FunctionComponent<FormProps> = ({
  event,
  setModal,
  closeHandler,
  setModalCopy,
}) => {
  const {register, handleSubmit, watch, errors} = useForm<Inputs>()

  const onSubmit = data => {
    axios({
      method: 'post',
      url: `/.netlify/functions/google-sheet-signup-fn`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: data.email,
        id: v4(),
        first_name: data.first_name,
        last_name: data.last_name,
        event_id: event.id,
      }),
    })
      .then(res => {
        if (res.status == 200) {
          setModalCopy(
            `Thanks for participating. We'll see you out there!`,
          )
          closeHandler(null)
          setModal(true)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.exampleRequired && (
          <span>This field is required</span>
        )}

        <div className="flex flex-col justify-start w-full">
          <input
            name="email"
            className="w-full p-2 my-2 text-base bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-red lg:w-full"
            placeholder="Email address"
            type="email"
            ref={register({required: true})}
          />

          <input
            name="first_name"
            className="w-full p-2 my-2 text-base bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-red lg:w-full"
            placeholder="First name"
            type="text"
            ref={register()}
          />

          <input
            name="last_name"
            className="w-full p-2 my-2 text-base bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-red lg:w-full"
            placeholder="Last name"
            type="text"
            ref={register()}
          />

          <div className="flex flex-row mt-2">
            <button
              type="submit"
              className="px-6 py-2 mt-2 mr-4 text-center transition duration-200 border-0 rounded text-md text-white-bright transition-ease-in-out bg-red focus:outline-none hover:bg-red-darker">
              Submit
            </button>
            <button
              onClick={() => closeHandler(null)}
              className="px-6 py-2 mt-2 text-center text-gray-400 transition duration-200 bg-white rounded text-md transition-ease-in-out focus:outline-none">
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export {Form as default}

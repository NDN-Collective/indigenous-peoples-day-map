import React, {FunctionComponent, useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import Modal from 'components/Modal'

type Inputs = {
  example: string
  exampleRequired: string
}

interface FormProps {
  id: number
  latitude: number
  longitude: number
}

const Form: FunctionComponent<FormProps> = ({id, latitude, longitude}) => {
  const [modalVisible, setModalVisible] = useState(null)
  const {register, handleSubmit, watch, errors} = useForm<Inputs>()

  const onSubmit = data => {
    axios({
      method: 'post',
      url: `/.netlify/functions/google-sheet-fn/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        contact: data.email,
        name: data.name,
        latitude,
        longitude,
      }),
    })
      .then(res => {
        if (res.status == 200) {
          setModalVisible(true)
        }
      })
      .catch(err => console.log(err))
  }

  const onCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium uppercase">Submit an event</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.exampleRequired && (
          <span>This field is required</span>
        )}

        <div className="flex flex-col justify-start w-full mt-2">
          <input
            name="email"
            className="w-full p-2 my-2 text-base bg-gray-100 border border-white rounded focus:outline-none focus:border-red lg:w-full"
            placeholder="Email address"
            type="email"
            ref={register({required: true})}
          />

          <input
            name="name"
            className="w-full p-2 my-2 text-base bg-gray-100 border border-white rounded focus:outline-none focus:border-red lg:w-full"
            placeholder="Event name"
            type="text"
            ref={register({required: true})}
          />

          <button
            type="submit"
            className="px-6 py-2 mt-2 text-lg text-center transition duration-200 border-0 rounded text-white-bright transition-ease-in-out bg-red focus:outline-none hover:bg-red-darker">
            Submit
          </button>
        </div>
      </form>

      <Modal
        closeHandler={onCloseModal}
        className={modalVisible ? 'visible' : 'hidden'}
      />
    </div>
  )
}

export {Form as default}

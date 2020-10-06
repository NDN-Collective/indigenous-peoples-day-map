import React, {FunctionComponent, MouseEventHandler} from 'react'

const Share: FunctionComponent = () =>
  <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row">
    <span className="inline-flex justify-center mx-auto mt-2">
      <a
        href="https://www.facebook.com/sharer/sharer.php?u=https://skovoteden.org"
        className="p-3 text-gray-500 duration-150 rounded-full transition-color hover:bg-blue hover:text-white">
        <svg
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      </a>

      <a
        href="https://twitter.com/home?status=https://skovoteden.org"
        className="p-3 text-gray-500 duration-150 rounded-full transition-color hover:bg-blue hover:text-white">
        <svg
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </a>
    </span>
  </div>

export {Share as default}
import React, {FunctionComponent} from 'react'

import type {AppProps} from 'next/app'

import '../styles/index.css'
import 'mapbox-gl/src/css/mapbox-gl.css'

const App: FunctionComponent<AppProps> = ({Component, pageProps}) =>
  <Component {...pageProps} />

export {App as default}

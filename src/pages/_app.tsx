import React, {FunctionComponent} from 'react'
import Head from 'next/head'
import type {AppProps} from 'next/app'

require('iframe-resizer/js/iframeResizer.contentWindow')

import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/index.css'
import 'react-datetime/css/react-datetime.css'

const App: FunctionComponent<AppProps> = ({Component, pageProps}) => (
  <>
    <Head>
      <script
        type="text/javascript"
        src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js"
      />
    </Head>
    <Component {...pageProps} />
  </>
)

export {App as default}

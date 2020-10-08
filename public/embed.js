window.landbackEmbedFrame = function() {
  var writeIframe = function() {
    return document.write(
      '<iframe id="embed-landback-map" src="https://landback-map.netlify.app" width="100%" scrolling="no" height="400" frameborder="0"></iframe>',
    )
  }

  writeIframe()

  var script = window.document.createElement('script')

  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.min.js'

  script.onload = function() {
    window.iFrameResize({
        log: false,
        checkOrigin: false,
      },
      '#embed-landback-map',
    )
  }

  window.document.head.appendChild(script)
}
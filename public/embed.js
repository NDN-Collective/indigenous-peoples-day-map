window.rtvFrame = function({
  partnerId = null,
  title = null,
  description = null,
  color_primary = '003C6E',
  color_accent = null,
  image = null,
}) {
  var baseUrl = 'https://landbackmap.netlify.com/'
}

var writeIframe = function(partnerId) {
  return document.write(
    '\n    <iframe id="embed-landback-map" src="' +
    makeUrl(partnerId) +
    '" width="100%" scrolling="no" height="400" frameborder="0"></iframe>\n  ',
  )
}
writeIframe(partnerId)

var script = window.document.createElement('script')
script.src =
  'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.min.js'
script.onload = function() {
  window.iFrameResize({ log: false, checkOrigin: false },
    '#embed-landback-map',
  )
}

window.document.head.appendChild(script)
}
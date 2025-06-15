import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Shinjuku-gyoen National Park',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 3,
  cartoConfig: {
    skipNamePattern: /(六丁目)/,
    splitNamePattern: /(レストラン|ミュージアム|休憩所|新宿御苑)/,
  },
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

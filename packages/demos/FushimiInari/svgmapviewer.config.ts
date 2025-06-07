import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Fushimi-inari',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 3,
  cartoConfig: {
    skipNamePattern: /^(常夜燈|永代常夜燈|献燈|奉献|奉燈|御神燈)$/,
  },
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

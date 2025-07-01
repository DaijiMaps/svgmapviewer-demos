import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Tomo-ga-shima',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 3,
  cartoConfig: {
    backgroundColor: 'lightblue',
  },
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

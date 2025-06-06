import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Yugyoji',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 3,
  cartoConfig: {
    skipNamePattern: /学園/,
  },
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

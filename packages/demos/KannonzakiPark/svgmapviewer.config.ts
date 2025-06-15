import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Kannonzaki Park',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 3,
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Ghibli Park',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 4,
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

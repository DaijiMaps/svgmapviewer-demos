import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'UnivOfTokyo-Hongo',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 5,
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

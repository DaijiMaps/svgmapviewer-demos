import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'
import { renderMap } from './src/map'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Shikine-Jima',
  /*
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 3,
  cartoConfig: {
    backgroundColor: 'lightblue',
  },
  */
  renderMap,
  isMapRendered: () => true,
  origViewBox: {
    x: 0,
    y: 0,
    width: 1280,
    height: 800,
  },
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

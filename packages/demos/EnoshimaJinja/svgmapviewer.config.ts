import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'
import internals from './src/data/internals-EnoshimaJinja.json'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Enoshima-Jinja',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 3,
  cartoConfig: {
    backgroundColor: 'lightblue',
    internals,
  },
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig

import { svgmapviewer, svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import mapSvg from './assets/floors.svg'
import { RenderMap } from './map'
import { workerSearchStart } from './search'

svgmapviewer({
  root: 'root',
  map: 'map1',
  href: `${mapSvg}`,
  width: 580,
  height: 610,
  zoomFactor: 2,
  renderMap: RenderMap,
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
})

svgMapViewerConfig.searchCbs.add(workerSearchStart)

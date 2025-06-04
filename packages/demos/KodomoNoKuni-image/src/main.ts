import { svgmapviewer, svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import mapSvg from './assets/floors.svg'
import { RenderInfo, RenderMap } from './render'
import { workerSearchStart } from './search'

svgmapviewer({
  root: 'root',
  map: 'map1',
  href: `${mapSvg}`,
  width: 580,
  height: 610,
  zoomFactor: 3,
  renderMap: RenderMap,
  renderInfo: RenderInfo,
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
})

svgMapViewerConfig.searchCbs.add(workerSearchStart)

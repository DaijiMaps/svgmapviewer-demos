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
  //origViewBox: { x: 5, y: 155, width: 580, height: 610 },
  zoomFactor: 2,
  renderMap: RenderMap,
  //renderInfo: RenderInfo,
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  //mapData,
  //mapCoord,
  //mapHtmlStyle,
  //mapSymbols,
  //mapNames,
})

svgMapViewerConfig.searchCbs.add(workerSearchStart)

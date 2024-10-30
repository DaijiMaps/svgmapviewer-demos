import { svgmapviewer, svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import mapSvg from './assets/kodomomap_2024_mono.svg'
import { RenderMap } from './map'
import { workerSearchStart } from './search'

svgmapviewer({
  root: 'root',
  map: 'map1',
  href: `${mapSvg}`,
  width: 595.275,
  height: 841.89,
  //origViewBox: { x: 0, y: 0, width: 595.275, height: 841.89 },
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

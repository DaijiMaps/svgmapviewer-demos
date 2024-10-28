import { svgmapviewer } from '@daijimaps/svgmapviewer'
import floors from './assets/floors.svg'
import { RenderMap } from './map'

svgmapviewer({
  root: 'root',
  map: 'map1',
  href: `${floors}`,
  width: 300,
  height: 300,
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

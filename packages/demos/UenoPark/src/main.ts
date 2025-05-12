import { svgMapViewerConfig, svgmapviewer } from '@daijimaps/svgmapviewer'
import {
  getMapLayers,
  getMapMarkers,
  getMapObjects,
  getMapSymbols,
} from './map'
import {
  mapCoord,
  mapData,
  mapHtmlStyle,
  mapNames,
  mapSymbols,
  mapViewBox,
} from './map-data'
import { RenderInfo } from './render'
import { workerSearchStart } from './search'

svgmapviewer({
  root: 'root',
  map: 'map1',
  origViewBox: mapViewBox,
  zoomFactor: 3,
  getMapLayers,
  getMapObjects,
  getMapSymbols,
  getMapMarkers,
  renderInfo: RenderInfo,
  title: 'Ueno Park',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  mapData,
  mapCoord,
  mapHtmlStyle,
  mapSymbols,
  mapNames,
})

svgMapViewerConfig.searchCbs.add(workerSearchStart)

document.title = `svgmapviewer @ ${window.location.host}`

import { svgMapViewerConfig, svgmapviewer } from '@daijimaps/svgmapviewer'
import { mapCoord, mapData, mapViewBox } from './data'
import { getMapLayers } from './map-layers'
import { getMapMarkers } from './map-markers'
import { mapHtmlStyle, mapNames, mapSymbols } from './map-names'
import { getMapObjects } from './map-objects'
import { getMapSymbols } from './map-symbols'
import { RenderInfo } from './render'
import { workerSearchInit, workerSearchStart } from './search'

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
  title: 'Ghibli Park',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  mapData,
  mapCoord,
  mapHtmlStyle,
  mapSymbols,
  mapNames,
})

svgMapViewerConfig.searchCbs.add(workerSearchStart)

document.title = `svgmapviewer @ ${window.location.host}`

workerSearchInit()

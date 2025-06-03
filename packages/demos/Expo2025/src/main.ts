import { configSend, svgmapviewer } from '@daijimaps/svgmapviewer'
import { addressEntries } from './address-data'
import './index.css' // XXX
import { mapCoord, mapData, mapMap, mapViewBox } from './map-data'
import { getMapLayers } from './map-layers'
import { getMapMarkers } from './map-markers'
import { mapHtmlStyle, mapNames, mapSymbols } from './map-names'
import { getMapObjects } from './map-objects'
import { getMapSymbols } from './map-symbols'
import { RenderInfo } from './render'
import { workerSearchInit, workerSearchStart } from './search'

import userConfig from '../svgmapviewer.config'

svgmapviewer({
  ...userConfig,
  root: 'root',
  map: 'map1',
  origViewBox: mapViewBox,
  zoomFactor: 5,
  getMapLayers,
  getMapObjects,
  getMapSymbols,
  getMapMarkers,
  renderInfo: RenderInfo,
  mapData,
  mapMap,
  mapCoord,
  mapHtmlStyle,
  mapSymbols,
  mapNames,
})

configSend({ type: 'ADD.CB', searchCb: workerSearchStart })

document.title = `svgmapviewer @ ${window.location.host}`

workerSearchInit(addressEntries())

import { registerCbs, svgmapviewer } from '@daijimaps/svgmapviewer'
import './index.css' // XXX
import { mapCoord, mapData, mapMap, mapViewBox } from './map-data'
import { getMapLayers } from './map-layers'
import { getMapMarkers } from './map-markers'
import { mapNames, mapSymbols } from './map-names'
import { getMapObjects } from './map-objects'
import { getMapSymbols } from './map-symbols'
import './map.css' // XXX
import { RenderInfo } from './render'
import { workerSearchInit, workerSearchStart } from './search'
import { searchEntries } from './search-data'

import { getAddressEntries } from '@daijimaps/svgmapviewer/search'
import userConfig from '../svgmapviewer.config'

svgmapviewer({
  ...userConfig,
  root: 'root',
  map: 'map1',
  origViewBox: mapViewBox,
  getMapLayers,
  getMapObjects,
  getMapSymbols,
  getMapMarkers,
  renderInfo: RenderInfo,
  mapData,
  mapMap,
  mapCoord,
  mapSymbols,
  mapNames,
  searchEntries,
})

registerCbs({
  searchCb: workerSearchStart,
})

document.title = `svgmapviewer @ ${window.location.host}`

workerSearchInit(getAddressEntries(mapData, searchEntries))

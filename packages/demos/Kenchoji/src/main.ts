import { svgmapviewer } from '@daijimaps/svgmapviewer'
import './index.css' // XXX
import { mapCoord, mapData, mapMap, mapViewBox } from './map-data'
import { getMapLayers } from './map-layers'
import { getMapMarkers } from './map-markers'
import { mapNames, mapSymbols } from './map-names'
import { getMapObjects } from './map-objects'
import { getMapSymbols } from './map-symbols'
import './map.css' // XXX
import { RenderInfo } from './render'
import { searchEntries } from './search-data'

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

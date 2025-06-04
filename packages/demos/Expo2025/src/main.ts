import { svgmapviewer } from '@daijimaps/svgmapviewer'
import {
  getMapLayers,
  getMapMarkers,
  getMapNames,
  getMapObjects,
  getMapSymbols,
  RenderInfo,
  searchEntries,
} from '@daijimaps/svgmapviewer-app'
import './app.css' // XXX
import './lib.css' // XXX
import { mapCoord, mapData, mapMap, mapViewBox } from './map-data'
//import { getMapLayers } from './map-layers'
//import { getMapMarkers } from './map-markers'
//import { mapNames, mapSymbols } from './map-names'
//import { getMapObjects } from './map-objects'
//import { getMapSymbols } from './map-symbols'
//import './map.css' // XXX
//import { RenderInfo } from './render'
//import { searchEntries } from './search-data'

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
  getMapNames,
  renderInfo: RenderInfo,
  mapData,
  mapMap,
  mapCoord,
  searchEntries,
})

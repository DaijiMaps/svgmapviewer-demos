import { SvgMapViewerConfig } from '@daijimaps/svgmapviewer'
import {
  calcScale,
  MapData,
  MapMap,
  mapMapFromMapData,
} from '@daijimaps/svgmapviewer/geo'
import areas from './data/areas.json'
import internals from './data/internals.json'
import lines from './data/map-lines.json'
import multilinestrings from './data/map-multilinestrings.json'
import multipolygons from './data/map-multipolygons.json'
import points from './data/map-points.json'
import measures from './data/measures.json'
import origin from './data/origin.json'
import viewbox from './data/viewbox.json'

const mapData: MapData = {
  areas,
  internals,
  origin,
  measures,
  viewbox,

  points,
  lines,
  multilinestrings,
  multipolygons,
}

const mapMap: MapMap = mapMapFromMapData(mapData)

const { mapCoord, mapViewBox: origViewBox } = calcScale(mapData)

export const mapConfig: Partial<SvgMapViewerConfig> = {
  mapData,
  mapMap,
  mapCoord,
  origViewBox,
}

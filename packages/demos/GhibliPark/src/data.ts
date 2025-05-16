import { calcScale, MapData } from '@daijimaps/svgmapviewer/geo'
import areas from './data/areas.json'
import centroids from './data/map-centroids.json'
import lines from './data/map-lines.json'
import midpoints from './data/map-midpoints.json'
import multilinestrings from './data/map-multilinestrings.json'
import multipolygons from './data/map-multipolygons.json'
import points from './data/map-points.json'
import measures from './data/measures.json'
import origin from './data/origin.json'
import viewbox from './data/viewbox.json'

//// mapData

export const mapData: MapData = {
  areas,
  origin,
  measures,
  viewbox,

  points,
  lines,
  multilinestrings,
  multipolygons,
  centroids,
  midpoints,
}

//// mapCoord
//// mapViewBox

export const { mapCoord, mapViewBox } = calcScale(mapData)

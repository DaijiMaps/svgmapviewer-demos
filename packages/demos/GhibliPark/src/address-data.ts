import { AddressEntries } from '@daijimaps/svgmapviewer/search'
import centroids from './data/map-centroids.json'
import points from './data/map-points.json'

const pointAddresses = (): AddressEntries =>
  points.features.flatMap((f) => {
    const id = f.properties.osm_id
    if (id === null) {
      return []
    }
    const x = f.geometry.coordinates[0]
    const y = f.geometry.coordinates[1]
    if (f.properties.name?.match(/./)) {
      return [{ a: id, lonlat: { x, y } }]
    } else if (f.properties.other_tags?.match(/"toilets"/)) {
      return [{ a: id, lonlat: { x, y } }]
    } else {
      return []
    }
  })

const centroidAddresses = (): AddressEntries =>
  centroids.features.flatMap((f) => {
    const osm_id = f.properties.osm_id
    const osm_way_id = f.properties.osm_way_id
    const id = osm_id ?? osm_way_id
    if (id === null) {
      return []
    }
    const x = f.geometry.coordinates[0]
    const y = f.geometry.coordinates[1]
    if (f.properties.name?.match(/./)) {
      return [{ a: id, lonlat: { x, y } }]
    } else if (f.properties.other_tags?.match(/"toilets"/)) {
      return [{ a: id, lonlat: { x, y } }]
    } else {
      return []
    }
  })

export const addressEntries: AddressEntries = [
  ...pointAddresses(),
  ...centroidAddresses(),
]

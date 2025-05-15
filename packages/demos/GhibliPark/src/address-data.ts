import { AddressEntries } from '@daijimaps/svgmapviewer/search'
import { mapData } from './map-data'

const pointAddresses = (): AddressEntries =>
  mapData.points.features.flatMap((f) => {
    const id = f.properties.osm_id
    if (id === null) {
      return []
    }
    const x = f.geometry.coordinates[0]
    const y = f.geometry.coordinates[1]
    if (f.properties.name?.match(/./)) {
      return [{ a: id, lonlat: { x, y } }]
    } else if (f.properties.other_tags?.match(/("bus_stop"|"toilets")/)) {
      return [{ a: id, lonlat: { x, y } }]
    } else {
      return []
    }
  })

const centroidAddresses = (): AddressEntries =>
  mapData.centroids.features.flatMap((f) => {
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
    } else if (f.properties.other_tags?.match(/("bus_stop"|"toilets")/)) {
      return [{ a: id, lonlat: { x, y } }]
    } else {
      return []
    }
  })

export const addressEntries = (): AddressEntries => [
  ...pointAddresses(),
  ...centroidAddresses(),
]

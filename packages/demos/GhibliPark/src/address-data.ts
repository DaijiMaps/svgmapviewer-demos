import { findFeature } from '@daijimaps/svgmapviewer/geo'
import {
  AddressEntries,
  SearchAddressRes,
} from '@daijimaps/svgmapviewer/search'
import { Info } from './info'
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

export function getAddressInfo(res: SearchAddressRes): null | Info {
  const feature = findFeature(res?.address, mapData)
  if (feature === null) {
    return null
  }
  const properties = feature.properties
  let info: null | Info = null
  if (properties?.other_tags?.match(/"toilets"/)) {
    info = {
      title: 'toilets',
      x: {
        tag: 'facility',
        title: 'toilets',
        address: res.address,
        properties,
      },
    }
  } else if (
    'highway' in properties &&
    properties?.highway?.match(/^bus_stop$/)
  ) {
    info = {
      title: 'bus_stop',
      x: {
        tag: 'facility',
        title: 'bus_stop',
        address: res.address,
        properties,
      },
    }
  } else {
    info = {
      title: 'shop',
      x: { tag: 'shop', address: res.address, properties },
    }
  }
  return info
}

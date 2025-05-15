import { findFeature, OsmPointLikeFeature } from '@daijimaps/svgmapviewer/geo'
import {
  AddressEntries,
  AddressEntry,
  SearchAddressRes,
} from '@daijimaps/svgmapviewer/search'
import { Info } from './info'
import { mapData } from './map-data'

const pointAddresses = (): AddressEntries =>
  mapData.points.features.flatMap((f) => {
    const e = filterFeature(f)
    return e === null ? [] : [e]
  })

const centroidAddresses = (): AddressEntries =>
  mapData.centroids.features.flatMap((f) => {
    const e = filterFeature(f)
    return e === null ? [] : [e]
  })

export const addressEntries = (): AddressEntries => [
  ...pointAddresses(),
  ...centroidAddresses(),
]

function filterFeature(f: OsmPointLikeFeature): null | AddressEntry {
  const { properties, geometry } = f
  const id =
    'osm_id' in properties && typeof properties['osm_id'] === 'string'
      ? properties['osm_id']
      : 'osm_way_id' in properties &&
          typeof properties['osm_way_id'] === 'string'
        ? properties['osm_way_id']
        : null
  if (id === null) {
    return null
  }
  if (geometry.coordinates.length != 2) {
    return null
  }
  const [x, y] = geometry.coordinates
  if (properties.name?.match(/./)) {
    return { a: id, lonlat: { x, y } }
  } else if (properties.other_tags?.match(/("bus_stop"|"toilets")/)) {
    return { a: id, lonlat: { x, y } }
  }
  return null
}

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

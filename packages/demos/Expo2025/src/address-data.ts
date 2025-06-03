/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable functional/functional-parameters */
import { findFeature, getOsmId, OsmFeature } from '@daijimaps/svgmapviewer/geo'
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

const polygonAddresses = (): AddressEntries =>
  mapData.multipolygons.features.flatMap((f) => {
    const e = filterFeature(f)
    return e === null ? [] : [e]
  })

export const addressEntries = (): AddressEntries => [
  ...pointAddresses(),
  ...polygonAddresses(),
]

function filterFeature(f: OsmFeature): null | AddressEntry {
  const { properties } = f
  const id = getOsmId(properties)
  if (id === null) {
    return null
  }
  const { centroid_x, centroid_y } = properties
  if (centroid_x === null || centroid_y === null) {
    return null
  }
  const [x, y] = [centroid_x, centroid_y]
  if (
    properties.name?.match(/./) ||
    properties.other_tags?.match(/("bus_stop"|"toilets")/)
  ) {
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

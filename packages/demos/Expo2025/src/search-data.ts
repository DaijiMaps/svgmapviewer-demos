/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable functional/functional-parameters */
import {
  findFeature,
  getOsmId,
  MapData,
  OsmFeature,
  OsmProperties,
} from '@daijimaps/svgmapviewer/geo'
import {
  AddressEntries,
  AddressEntry,
  SearchAddressRes,
} from '@daijimaps/svgmapviewer/search'
import { Info } from './info'

const pointAddresses = (mapData: MapData): AddressEntries =>
  mapData.points.features.flatMap((f) => {
    const e = filterFeature(f)
    return e === null ? [] : [e]
  })

const polygonAddresses = (mapData: MapData): AddressEntries =>
  mapData.multipolygons.features.flatMap((f) => {
    const e = filterFeature(f)
    return e === null ? [] : [e]
  })

export const addressEntries = (mapData: MapData): AddressEntries => [
  ...pointAddresses(mapData),
  ...polygonAddresses(mapData),
]

////

function filterFeature({ properties }: OsmFeature): null | AddressEntry {
  const id = getOsmId(properties)
  if (id === null) {
    return null
  }
  const { centroid_x, centroid_y } = properties
  if (centroid_x === null || centroid_y === null) {
    return null
  }
  const matches = entries.filter((entry) => entry.filter(properties))
  if (matches.length > 0) {
    return { a: id + '', lonlat: { x: centroid_x, y: centroid_y } }
  }
  return null
}

////

export function getAddressInfo(
  mapData: MapData,
  res: SearchAddressRes
): null | Info {
  const feature = findFeature(res?.address, mapData)
  if (feature === null) {
    return null
  }
  const properties = feature.properties
  const matches = entries.flatMap((entry) =>
    !entry.filter(properties) ? [] : [entry.getInfo(properties, res.address)]
  )
  return matches.length === 0 ? null : matches[0]
}

////

const entries: readonly Entry[] = [
  {
    // toilets
    filter: (properties) => !!properties?.other_tags?.match(/"toilets"/),
    getInfo: (properties, address) => ({
      title: 'toilets',
      x: {
        tag: 'facility',
        title: 'toilets',
        address: address,
        properties,
      },
    }),
  },
  {
    // bus_stop
    filter: (properties) => !!properties?.other_tags?.match(/"bus_stop"/),
    getInfo: (properties, address) => ({
      title: 'bus_stop',
      x: {
        tag: 'facility',
        title: 'bus_stop',
        address: address,
        properties,
      },
    }),
  },
  {
    // others (shop)
    filter: (properties) => !!properties.name?.match(/./),
    getInfo: (properties, address) => ({
      title: 'shop',
      x: { tag: 'shop', address, properties },
    }),
  },
]

interface Entry {
  filter: (p: OsmProperties) => boolean
  getInfo: (p: OsmProperties, a: string) => Info
}

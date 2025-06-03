/* eslint-disable functional/prefer-immutable-types */
import { findFeature, MapData, SearchEntry } from '@daijimaps/svgmapviewer/geo'
import { SearchAddressRes } from '@daijimaps/svgmapviewer/search'
import { Info } from './info'

export function getAddressInfo(
  mapData: MapData,
  entries: SearchEntry[],
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

export const searchEntries: SearchEntry[] = [
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

import { findProperties } from '@daijimaps/svgmapviewer/geo'
import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import centroids from './data/map-centroids.json'
import midpoints from './data/map-midpoints.json'
import points from './data/map-points.json'
import { FacilityInfo, Info, ShopInfo } from './info'

export function searchInfo(address: string, lonlat: Vec): null | Info {
  const p = findProperties(address, { points, centroids, midpoints })
  if (p?.other_tags?.match(/"toilets"/)) {
    const facilityInfo: FacilityInfo = {
      tag: 'facility',
      name: `${address} @ ${lonlat.x}, ${lonlat.y}`,
      address: address,
    } as FacilityInfo
    const info: Info = {
      title: `Found: POI: (${lonlat.x},${lonlat.y})`,
      x: facilityInfo,
    }
    return info
  }
  // XXX switch by address string
  const shopInfo: ShopInfo = {
    tag: 'shop',
    name: `${address} @ ${lonlat.x}, ${lonlat.y}`,
    address: address,
  } as ShopInfo
  const info: Info = {
    title: `Found: POI: (${lonlat.x},${lonlat.y})`,
    x: shopInfo,
  }
  return info
}

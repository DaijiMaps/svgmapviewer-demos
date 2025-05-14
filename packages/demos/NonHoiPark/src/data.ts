import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import { Info, ShopInfo } from './info'

export function searchInfo(address: string, lonlat: Vec): null | Info {
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

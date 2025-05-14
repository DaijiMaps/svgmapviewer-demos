import { initAddresses, searchAddress } from '@daijimaps/svgmapviewer/search'
import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import { addressEntries } from './address-data'
import { searchInfo } from './data'
import { Info } from './info'

const ctx = initAddresses(addressEntries)

onmessage = function (e: Readonly<MessageEvent<{ pgeo: Vec }>>) {
  const pgeo = e.data.pgeo

  const loc = searchAddress(ctx, pgeo)

  const info = loc === null ? null : searchInfo(loc.address, loc.lonlat)

  const res: null | { pgeo: Vec; info: Info } =
    loc === null || info === null ? null : { pgeo: loc.lonlat, info }

  if (addressEntries === null) {
    this.postMessage(null)
  }
  this.postMessage(res)
}

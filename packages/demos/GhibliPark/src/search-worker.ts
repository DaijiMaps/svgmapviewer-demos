import { initAddresses, searchAddress } from '@daijimaps/svgmapviewer/search'
import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import { addressEntries } from './address-data'

const ctx = initAddresses(addressEntries)

onmessage = function (e: Readonly<MessageEvent<{ pgeo: Vec }>>) {
  const pgeo = e.data.pgeo

  const loc = searchAddress(ctx, pgeo)

  this.postMessage(loc)
}

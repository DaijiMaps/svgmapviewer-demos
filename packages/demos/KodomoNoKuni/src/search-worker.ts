import { initAddresses, searchAddress } from '@daijimaps/svgmapviewer/search'
import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import addresses_GF from './data/addresses/addresses_GF.json'
import infosJson from './data/infos.json'
import { Info, InfosJson } from './info'

const infos: InfosJson = infosJson

const dx = 5
const dy = 155

// XXX adjust viewBox offset
function conv({ x, y }: Vec): Vec {
  return { x: x - dx, y: y - dy }
}

const addressEntries: { a: string; lonlat: Vec }[] = Object.entries(
  addresses_GF
).map(([a, v]) => ({ a, lonlat: conv(v) }))

////

function searchInfo(address: string, lonlat: Vec): null | Info {
  if (address in infos) {
    const d = infos[address]
    const info: Info = {
      title: d.name,
      x: {
        tag: 'shop',
        name: d.name,
        address: address,
      },
    }
    return info
  }
  // XXX switch by address string
  const info: Info = {
    title: `Found: POI: (${lonlat.x},${lonlat.y})`,
    x: {
      tag: 'shop',
      name: `${address} @ ${lonlat.x}, ${lonlat.y}`,
      address: address,
    },
  }
  return info
}

////

const ctx = initAddresses(addressEntries)

onmessage = function (e: Readonly<MessageEvent<{ p: Vec; pgeo: Vec }>>) {
  const p = e.data.p
  const pgeo = e.data.pgeo

  const loc = searchAddress(ctx, pgeo)

  const info = loc === null ? null : searchInfo(loc.address, loc.lonlat)

  const res: null | { p: Vec; pgeo: Vec; info: Info } =
    loc === null || info === null ? null : { p, pgeo: loc.lonlat, info }

  if (addressEntries === null) {
    this.postMessage(null)
  }
  this.postMessage(res)
}

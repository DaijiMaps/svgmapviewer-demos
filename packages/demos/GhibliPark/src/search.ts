import { svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import { findFeature } from '@daijimaps/svgmapviewer/geo'
import { SearchAddressRes } from '@daijimaps/svgmapviewer/search'
import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import { Info } from './info'
import SearchWorker from './search-worker/main?worker'

const worker = new SearchWorker()

worker.onmessage = (e: Readonly<MessageEvent<null | SearchAddressRes>>) => {
  const res = e.data
  if (res === null) {
    return
  }
  const info = getInfo(res)
  if (info === null) {
    return
  }
  const psvg = svgMapViewerConfig.mapCoord.fromGeo(res.lonlat)
  svgMapViewerConfig.searchDoneCbs.forEach((cb) => cb({ psvg, info }))
}

export function getInfo(res: SearchAddressRes): null | Info {
  const feature = findFeature(res?.address, svgMapViewerConfig.mapData)
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

worker.onerror = (ev) => {
  console.log('error', ev)
}

worker.onmessageerror = (ev) => {
  console.log('messageerror', ev)
}

export function workerSearchStart(psvg: Vec) {
  const pgeo = svgMapViewerConfig.mapCoord.toGeo(psvg)
  worker.postMessage({ pgeo })
}

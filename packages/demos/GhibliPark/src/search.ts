import { svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import { findProperties } from '@daijimaps/svgmapviewer/geo'
import { SearchAddressRes } from '@daijimaps/svgmapviewer/search'
import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import { Info } from './info'
import SearchWorker from './search-worker?worker'

const worker = new SearchWorker()

worker.onmessage = (e: Readonly<MessageEvent<null | SearchAddressRes>>) => {
  const data = e.data
  if (data === null) {
    return
  }
  const psvg = svgMapViewerConfig.mapCoord.fromGeo(data.lonlat)
  const properties = findProperties(data?.address, svgMapViewerConfig.mapData)
  if (properties) {
    let info: null | Info = null
    if (properties?.other_tags?.match(/"toilets"/)) {
      info = {
        title: 'toilets',
        x: {
          tag: 'facility',
          title: 'toilets',
          address: data.address,
          properties,
        },
      }
    } else {
      info = {
        title: 'shop',
        x: { tag: 'shop', address: data.address, properties },
      }
    }
    if (info !== null) {
      svgMapViewerConfig.searchDoneCbs.forEach((cb) => cb({ psvg, info }))
    }
  }
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

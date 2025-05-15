import { svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import { findFeature } from '@daijimaps/svgmapviewer/geo'
import { SearchAddressRes } from '@daijimaps/svgmapviewer/search'
import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import { addressEntries } from './address-data'
import { Info } from './info'
import { SearchWorkerRes } from './search-worker/main'
import SearchWorker from './search-worker/main?worker'

const worker = new SearchWorker()

worker.onmessage = (e: Readonly<MessageEvent<null | SearchWorkerRes>>) => {
  const ev = e.data
  if (ev === null) {
    return
  }
  if (ev.type === 'INIT.DONE') {
    // XXX
  } else if (ev.type === 'SEARCH.DONE') {
    const res = ev.res
    const info = getInfo(res)
    if (info === null) {
      return
    }
    const psvg = svgMapViewerConfig.mapCoord.fromGeo(res.lonlat)
    svgMapViewerConfig.searchDoneCbs.forEach((cb) => cb({ psvg, info }))
  }
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

export function workerSearchInit() {
  const entries = addressEntries()
  worker.postMessage({ type: 'INIT', entries })
}

export function workerSearchStart(psvg: Vec) {
  const pgeo = svgMapViewerConfig.mapCoord.toGeo(psvg)
  worker.postMessage({ type: 'SEARCH', pgeo })
}

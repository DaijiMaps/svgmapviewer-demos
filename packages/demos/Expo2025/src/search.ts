import { notifySearchDone, svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import {
  AddressEntries,
  SearchAddressRes,
} from '@daijimaps/svgmapviewer/search'
import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import { getAddressInfo } from './address-data'
import { SearchWorkerRes } from './search-worker'
import SearchWorker from './search-worker?worker'

const worker = new SearchWorker()

worker.onmessage = (e: Readonly<MessageEvent<SearchWorkerRes>>) => {
  const ev = e.data
  if (ev.type === 'INIT.DONE') {
    // XXX
  } else if (ev.type === 'SEARCH.DONE') {
    handleSearchRes(ev.res)
  }
}

function handleSearchRes(res: SearchAddressRes): void {
  const info = getAddressInfo(res)
  if (info === null) {
    return
  }
  const psvg = svgMapViewerConfig.mapCoord.fromGeo(res.lonlat)
  notifySearchDone(psvg, info)
}

worker.onerror = (ev) => {
  console.log('error', ev)
}

worker.onmessageerror = (ev) => {
  console.log('messageerror', ev)
}

export function workerSearchInit(entries: AddressEntries) {
  worker.postMessage({ type: 'INIT', entries })
}

export function workerSearchStart(psvg: Vec) {
  const pgeo = svgMapViewerConfig.mapCoord.toGeo(psvg)
  worker.postMessage({ type: 'SEARCH', pgeo })
}

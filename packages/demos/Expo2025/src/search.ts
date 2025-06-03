/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statements */
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

function handleSearchRes(res: Readonly<SearchAddressRes>): void {
  const info = getAddressInfo(res)
  if (info === null) {
    return
  }
  const psvg = svgMapViewerConfig.mapCoord.matrix.transformPoint(res.lonlat)
  notifySearchDone(psvg, info)
}

worker.onerror = (ev) => {
  console.log('error', ev)
}

worker.onmessageerror = (ev) => {
  console.log('messageerror', ev)
}

export function workerSearchInit(entries: Readonly<AddressEntries>) {
  worker.postMessage({ type: 'INIT', entries })
}

export function workerSearchStart(psvg: Readonly<Vec>) {
  const pgeo = svgMapViewerConfig.mapCoord.matrix.inverse().transformPoint(psvg)
  worker.postMessage({ type: 'SEARCH', pgeo })
}

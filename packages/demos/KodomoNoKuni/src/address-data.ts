import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import addresses_GF from './data/addresses_GF.json'

export const addressEntries: { a: string; lonlat: Vec }[] =
  Object.entries(addresses_GF).map(([a, { x, y }]) => ({ a, lonlat: { x, y } }))

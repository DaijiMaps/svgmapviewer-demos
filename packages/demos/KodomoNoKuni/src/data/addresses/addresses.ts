import { FloorName } from '../floors/names'
import addressesGFJson from './addresses_GF.json'

export type Address = keyof typeof addressesGFJson

interface Point {
  x: number
  y: number
  w: number
}

type Addresses = Partial<Record<Address, Point>>

export const floorAddresses: Record<FloorName, Addresses> = {
  GF: addressesGFJson,
}

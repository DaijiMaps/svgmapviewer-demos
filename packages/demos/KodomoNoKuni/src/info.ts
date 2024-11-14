import { Info } from '@daijimaps/svgmapviewer'

export interface ShopInfo {
  tag: 'shop'
  name?: string
  address?: string
}

export interface FacilityInfo {
  tag: 'facility'
  name?: string
  address?: string
}

export type XInfo = ShopInfo | FacilityInfo

export type InfosJson = Record<string, Required<Pick<XInfo, 'name'>>>

declare module '@daijimaps/svgmapviewer' {
  interface Info {
    x: XInfo
  }
}

export type { Info }

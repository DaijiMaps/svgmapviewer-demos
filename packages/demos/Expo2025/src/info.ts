import { Info } from '@daijimaps/svgmapviewer'
import { OsmPointProperties, OsmPolygonProperties } from '@daijimaps/svgmapviewer/geo'

export interface ShopInfo {
  tag: 'shop'
  properties: OsmPointProperties | OsmPolygonProperties
  name?: string
  address?: string
  website?: string
}

export interface FacilityInfo {
  tag: 'facility'
  properties: OsmPointProperties | OsmPolygonProperties
  name?: string
  address?: string
}

declare module '@daijimaps/svgmapviewer' {
  interface Info {
    x: ShopInfo | FacilityInfo
  }
}

export type { Info }

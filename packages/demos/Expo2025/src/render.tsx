import { svgMapViewerConfig as cfg } from '@daijimaps/svgmapviewer'
import { findProperties } from '@daijimaps/svgmapviewer/geo'
import { FacilityInfo, Info, ShopInfo } from './info'

export interface Props {
  info: Info
}

export function RenderInfo(props: Readonly<Props>) {
  const properties = findProperties(props.info.x.address)
  if (properties === null) {
    return <p>XXX info not found (osm_id={props.info.x.address}) XXX</p>
  }
  const props2 = {
    ...props.info.x,
    properties
  }
  return props.info.x.tag === 'shop'
    ? RenderShopInfo(props2)
    : RenderFacilityInfo(props2)
}

function RenderShopInfo(props: Readonly<ShopInfo>) {
  return (
    <>
      <p>{props.properties.name ?? props.name}</p>
    </>
  )
}

function RenderFacilityInfo(props: Readonly<FacilityInfo>) {
  return (
    <>
      <p>{props.properties.name ?? props.name}</p>
    </>
  )
}

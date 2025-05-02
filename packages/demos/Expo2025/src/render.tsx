import { svgMapViewerConfig as cfg } from '@daijimaps/svgmapviewer'
import { getPropertyValue, findProperties } from '@daijimaps/svgmapviewer/geo'
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
  const website = getPropertyValue(props.properties, 'website')

  return (
    <>
      <p>{props.properties.name ?? props.name}</p>
      {website !== null && <p>website: <a target="_blank" href={website}>{website}</a></p>}
      {props.properties.osm_id ?? <p>osm_id: {props.osm_id}</p>}
      {props.properties.osm_way_id ?? <p>osm_way_id: {props.osm_way_id}</p>}
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

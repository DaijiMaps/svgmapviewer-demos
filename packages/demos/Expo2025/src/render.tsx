import { Like } from '@daijimaps/svgmapviewer'
import { findProperties, getPropertyValue } from '@daijimaps/svgmapviewer/geo'
import { FacilityInfo, Info, ShopInfo } from './info'

export interface Props {
  info: Info
}

export function RenderInfo(props: Readonly<Props>) {
  const properties =
    'address' in props.info.x ? findProperties(props.info.x.address) : null
  if (properties === null) {
    return <p>XXX info not found (osm_id={props.info.x.address}) XXX</p>
  }
  const props2 = {
    ...props.info.x,
    properties,
  }
  return props.info.x.tag === 'shop'
    ? RenderShopInfo(props2)
    : RenderFacilityInfo(props2)
}

function RenderShopInfo(props: Readonly<ShopInfo>) {
  const website = getPropertyValue(props.properties, 'website')
  const osm_id = Number(props.properties.osm_id ?? '')
  const osm_way_id = Number(
    ('osm_way_id' in props.properties && props.properties.osm_way_id) ?? ''
  )
  const id = osm_id !== 0 ? osm_id : osm_way_id !== 0 ? osm_way_id : 0

  return (
    <>
      <p>
        {props.properties.name ?? props.name} {id !== 0 && <Like _id={id} />}
      </p>
      {website !== null && (
        <p>
          website:{' '}
          <a target="_blank" href={website}>
            {website}
          </a>
        </p>
      )}
      {osm_id !== 0 && <p>osm_id: {osm_id}</p>}
      {osm_way_id !== 0 && <p>osm_way_id: {osm_way_id}</p>}
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

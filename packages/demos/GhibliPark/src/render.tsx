import { Like, svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import {
  findProperties,
  getPropertyValue,
  OsmLineProperties,
  OsmPointProperties,
  OsmPolygonProperties,
} from '@daijimaps/svgmapviewer/geo'
import { FacilityInfo, Info, ShopInfo } from './info'

export interface Props {
  info: Info
}

export function RenderInfo(props: Readonly<Props>) {
  const cfg = svgMapViewerConfig.mapData
  const properties =
    'address' in props.info.x ? findProperties(props.info.x.address, cfg) : null
  if (properties === null) {
    return <p>XXX info not found (osm_id={props.info.x.address}) XXX</p>
  }
  return props.info.x.tag === 'shop'
    ? RenderShopInfo({ x: props.info.x, properties })
    : RenderFacilityInfo({ x: props.info.x, properties })
}

function RenderShopInfo(
  props: Readonly<{
    x: ShopInfo
    properties: OsmPointProperties | OsmLineProperties | OsmPolygonProperties
  }>
) {
  const website = getPropertyValue(props.properties, 'website')
  const osm_id = Number(props.properties.osm_id ?? '')
  const osm_way_id = Number(
    ('osm_way_id' in props.properties && props.properties.osm_way_id) ?? ''
  )
  const id = osm_id !== 0 ? osm_id : osm_way_id !== 0 ? osm_way_id : 0

  return (
    <>
      <p>
        {props.properties.name ?? props.x.name} {id !== 0 && <Like _id={id} />}
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

function RenderFacilityInfo(
  props: Readonly<{
    x: FacilityInfo
    properties: OsmPointProperties | OsmLineProperties | OsmPolygonProperties
  }>
) {
  return (
    <>
      <p>{props.x.title}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '1em',
        }}
      >
        <svg
          style={{ display: 'block' }}
          viewBox="-36 -36 72 72"
          width="3em"
          height="3em"
        >
          {props.x.title === 'bus_stop' && <use href="#XBus" />}
          {props.x.title === 'toilets' && <use href="#XToilets" />}
        </svg>
      </div>
      <p>{props.x.properties.name}</p>
    </>
  )
}

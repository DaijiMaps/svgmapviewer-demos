import { svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import {
  Layout,
  Line,
  lineToPath,
  MultiPolygon,
  multiPolygonToPath,
  RenderMapProps,
} from '@daijimaps/svgmapviewer/geo'
import { V } from '@daijimaps/svgmapviewer/tuple'
import { Assets } from './map-assets'
import { getAll } from './map-data'
import './map.css'
import { BenchPath } from './objects/bench'
import { GuidePostPath } from './objects/guide-post'
import { InfoBoardPath } from './objects/info-board'
import { MonumentPath } from './objects/monument'
import { Tree8x8Path } from './objects/tree'

export function RenderMap(props: RenderMapProps) {
  return (
    <>
      <Assets />
      <g id={svgMapViewerConfig.map} className="map">
        <g>
          <Areas />
          <Buildings />
          <Waters />
          <Streams />
          <PedestrianAreas />
          <Footways />
          <Cycleways />
          <Services />
          <Roads />
          <Walls />
          <Forests />
        </g>
        <Objects />
        <Facilities {...props} />
      </g>
    </>
  )
}

function Areas() {
  const xs: MultiPolygon[] = svgMapViewerConfig.mapData.areas.features.map(
    (f) => f.geometry.coordinates
  ) as MultiPolygon[]

  const d = xs.map(multiPolygonToPath).join('')

  return <path className="area" d={d} />
}

function Buildings() {
  const xs: MultiPolygon[] = svgMapViewerConfig.mapData.multipolygons.features
    .filter((f) => f.properties.building?.match(/./))
    .map((f) => f.geometry.coordinates) as MultiPolygon[]

  const d = xs.map(multiPolygonToPath).join('')

  return <path className="building" d={d} />
}

function PedestrianAreas() {
  const xs: MultiPolygon[] = svgMapViewerConfig.mapData.multipolygons.features
    .filter((f) => f.properties.other_tags?.match(/"pedestrian"/))
    .map((f) => f.geometry.coordinates) as MultiPolygon[]

  const d = xs.map(multiPolygonToPath).join('')

  return <path className="pedestrian-area" d={d} />
}

function Waters() {
  const xs = svgMapViewerConfig.mapData.multipolygons.features
    .filter((f) => f.properties.natural?.match(/water/))
    .map((f) => f.geometry.coordinates) as MultiPolygon[]

  const d = xs.map(multiPolygonToPath).join('')

  return <path className="water" d={d} />
}

function Streams() {
  const xs = svgMapViewerConfig.mapData.lines.features
    .filter((f) => f.properties.waterway?.match(/stream/))
    .map((f) => f.geometry.coordinates) as Line[]

  const d = xs.map(lineToPath).join('')

  return <path className="stream" d={d} />
}

function Forests() {
  const xs = svgMapViewerConfig.mapData.multipolygons.features
    .filter((f) => f.properties.landuse?.match(/forest/))
    .map((f) => f.geometry.coordinates) as MultiPolygon[]

  const d = xs.map(multiPolygonToPath).join('')

  return <path className="forest" d={d} />
}

function Roads() {
  const xs = svgMapViewerConfig.mapData.lines.features
    .filter((f) =>
      f.properties.highway?.match(/footway|path|steps|pedestrian|cycleway|service/)
    )
    .map((f) => f.geometry.coordinates) as Line[]

  const d = xs.map(lineToPath).join('')

  return <path className="road" d={d} />
}

function Services() {
  const xs = svgMapViewerConfig.mapData.lines.features
    .filter((f) => f.properties.highway?.match(/service/))
    .map((f) => f.geometry.coordinates) as Line[]

  const d = xs.map(lineToPath).join('')

  return <path className="service" d={d} />
}

function Cycleways() {
  const xs = svgMapViewerConfig.mapData.lines.features
    .filter((f) => f.properties.highway?.match(/cycleway/))
    .map((f) => f.geometry.coordinates) as Line[]

  const d = xs.map(lineToPath).join('')

  return <path className="cycleway" d={d} />
}

/*
function Bridges() {
  const xs = svgMapViewerConfig.mapData.lines.features
    .filter(
      (f) =>
        (f.properties.highway?.match(/footway/) ||
          f.properties.highway?.match(/pedestrian/)) &&
        f.properties.other_tags?.match(/"bridge"/)
    )
    .map((f) => f.geometry.coordinates) as Line[]

  const d = xs.map(lineToPath).join('')

  return <path className="footway-bridge" d={d} />
}
*/

function Footways() {
  const xs = svgMapViewerConfig.mapData.lines.features
    .filter(
      (f) =>
        f.properties.highway?.match(/path|footway|steps|pedestrian/)
    )
    .map((f) => f.geometry.coordinates) as Line[]

  const d = xs.map(lineToPath).join('')

  return <path className="footway" d={d} />
}

/*
function Steps() {
  const xs = svgMapViewerConfig.mapData.lines.features
    .filter((f) => f.properties.highway?.match(/steps/))
    .map((f) => f.geometry.coordinates) as Line[]

  const d = xs.map(lineToPath).join('')

  return (
    <g className="steps">
      <path className="bg" d={d} />
      <path className="fg" d={d} />
    </g>
  )
}
*/

function Walls() {
  const xs = svgMapViewerConfig.mapData.lines.features
    .filter(
      (f) =>
        f.properties.barrier?.match(/wall|fence|retaining_wall/)
    )
    .map((f) => f.geometry.coordinates) as Line[]

  const d = xs.map(lineToPath).join('')

  return <path className="wall" d={d} />
}

function Objects() {
  return (
    <g>
      <Benches />
      <GuidePosts />
      <InfoBoards />
      <Monuments />
      <Trees />
    </g>
  )
}

function Benches() {
  const vs = getAll({
    points: (f) => !!f.properties.other_tags?.match(/"bench"/),
  })
  return <RenderObjects width={0.05} path={BenchPath} vs={vs} />
}

function GuidePosts() {
  const vs = getAll({
    points: (f) => !!f.properties.other_tags?.match(/"guidepost"/),
  })
  return <RenderObjects width={0.05} path={GuidePostPath} vs={vs} />
}

function InfoBoards() {
  const vs = getAll({
    points: (f) => !!f.properties.other_tags?.match(/"information"=>"(board|map)"/),
  })
  return <RenderObjects width={0.05} path={InfoBoardPath} vs={vs} />
}

function Monuments() {
  const vs = getAll({
    points: (f) => !!f.properties.other_tags?.match(/"historic"=>"(historial|monument)"/),
  })
  return <RenderObjects width={0.05} path={MonumentPath} vs={vs} />
}

function Trees() {
  const vs = getAll({
    points: (f) => !!f.properties.other_tags?.match(/"tree"/),
  })
  return (
    <>
      <RenderObjects width={0.15} path={Tree8x8Path} vs={vs} />
    </>
  )
}

function Facilities(props: RenderMapProps) {
  const { config, svgScale } = props.layout
  const sz = svgScale.s / config.fontSize * 0.9
  return (
    <g>
      <Toilets sz={sz} />
      <Parkings sz={sz} />
    </g>
  )
}

function Toilets(props: { sz: number }) {
  const vs = getAll({
    points: (f) => !!f.properties.other_tags?.match(/"toilets"/),
    centroids: (f) =>
      !!f.properties.other_tags?.match(/"toilets"/) ||
      f.properties.amenity?.match(/toilets/),
  })
  return <RenderUses href="#XToilets" vs={vs} sz={props.sz} />
}

function Parkings(props: { sz: number }) {
  const vs = getAll({
    points: (f) => !!f.properties.other_tags?.match(/"parking"/),
    centroids: (f) => !!f.properties.other_tags?.match(/"parking"/),
  })

  return <RenderUses href="#XParking" vs={vs} sz={props.sz} />
}

function RenderUses(props: { href: string; vs: V[]; sz: number }) {
  return (
    <>
      {props.vs.map(([x, y], idx) => (
        <use key={idx} href={props.href} transform={`translate(${x}, ${y}) scale(${props.sz * 72 * 0.625})`} />
      ))}
    </>
  )
}

function RenderObjects(props: { width: number; path: string; vs: V[] }) {
  return (
    <path
      fill="none"
      stroke="black"
      strokeWidth={props.width}
      d={props.vs.map(([x, y]) => `M ${x},${y}` + props.path).join('')}
    />
  )
}

/*
function Labels() {
  const re = /"tree"/
  const vs = getAll({
    points: (f) => !!f.properties.other_tags?.match(re),
  })
  const d = vs
    .map(
      ([x, y]) => `M${x},${y} m7.5,0 a7.5,7.5 0,0,1 -15,0a7.5,7.5 0,1,1 15,0z`
    )
    .join('')
  return (
    <g>
      <path d={d} fill="white" fillOpacity="0.5" />
      <text>
        {vs.map(([x, y], idx) => (
          <>
            <tspan key={idx*4+0} x={x} y={y + 0.9 - 3.75}>
              日本語
            </tspan>
            <tspan key={idx*4+1} x={x} y={y + 0.9}>
              テスト
            </tspan>
            <tspan key={idx*4+2} x={x} y={y + 0.9 + 3.75}>
              123
            </tspan>
          </>
        ))}
      </text>
    </g>
  )
}
*/

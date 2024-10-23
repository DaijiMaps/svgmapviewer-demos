import { Parking, Toilets } from '@daijimaps/svgmapviewer/carto-symbols'

export function RenderMapAssets() {
  return (
    <g className="assets">
      <Symbols />
    </g>
  )
}

export function Symbols() {
  return (
    <g className="symbols">
      <Parking />
      <Toilets />
    </g>
  )
}

import { type ReactNode } from 'react'
import mapSvgUrl from './assets/map.svg'
import { useLayout2 } from '@daijimaps/svgmapviewer'

export function renderMap(): ReactNode {
  const { viewBox, width, height } = useLayout2()

  return <svg viewBox={viewBox} width={width} height={height}>
    <image href={mapSvgUrl} x="0" y="0" width="1280" height="800" />
  </svg>
}

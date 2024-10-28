import { svgMapViewerConfig } from '@daijimaps/svgmapviewer'
import './map.css'

export function RenderMap(/*props: { zoom: number, z: null | number }*/) {
  return (
    <>
      <image
        id={svgMapViewerConfig.map}
        href={svgMapViewerConfig.href}
        width={svgMapViewerConfig.width}
        height={svgMapViewerConfig.height}
      />
    </>
  )
}


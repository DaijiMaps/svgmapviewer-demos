import { svgMapViewerConfig } from '@daijimaps/svgmapviewer'

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

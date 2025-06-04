import { svgMapViewerConfig } from "@daijimaps/svgmapviewer";
import { Info } from "./info";

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
  );
}

export function RenderInfo(props: Readonly<{ info: Info }>) {
  return (
    <>
      <h3 style={{ margin: '1.5em', textAlign: 'center' }}>{props.info.title}</h3>
      {props.info.x.tag !== "shop" ? (
        <></>
      ) : (
        (props.info.x.descrs ?? []).map((descr, i) => <p key={i}>{descr}</p>)
      )}
    </>
  );
}

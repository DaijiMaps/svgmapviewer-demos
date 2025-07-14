import { svgmapviewer } from '@daijimaps/svgmapviewer'
//import { renderConfig } from '@daijimaps/svgmapviewer-app'
//import { dataConfig } from './map-data'
//import { renderMapSvg } from './map'

import userConfig from '../svgmapviewer.config'

svgmapviewer({
  //...dataConfig,
  //...renderConfig,
  ...userConfig,
  //root: 'root',
  //map: 'map1',
  /*
  renderMap: renderMapSvg,
  isMapRendered: () => true,
  origViewBox: {
    x: 0,
    y: 0,
    width: 1280,
    height: 800,
  },
  */
})

import { svgmapviewer } from '@daijimaps/svgmapviewer'
import { renderConfig } from '@daijimaps/svgmapviewer-app'
import { dataConfig } from './map-data'

import userConfig from '../svgmapviewer.config'

svgmapviewer({
  ...dataConfig,
  ...renderConfig,
  ...userConfig,
  root: 'root',
  map: 'map1',
})

import { svgmapviewer } from '@daijimaps/svgmapviewer'
import { appConfig } from '@daijimaps/svgmapviewer-app'
import './app.css' // XXX
import './lib.css' // XXX
import { mapConfig } from './map-data'

import userConfig from '../svgmapviewer.config'

svgmapviewer({
  ...mapConfig,
  ...appConfig,
  ...userConfig,
  root: 'root',
  map: 'map1',
})

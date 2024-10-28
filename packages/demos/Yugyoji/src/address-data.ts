import { VecVec as Vec } from '@daijimaps/svgmapviewer/vec'
import points from './data/map-points.json'

export const addressEntries: { a: string; lonlat: Vec }[] =
  points.features.flatMap((f) => {
    if (f.properties.name?.match(/./)) {
      return [
        {
          a: f.properties.name,
          lonlat: {
            x: f.geometry.coordinates[0],
            y: f.geometry.coordinates[1],
          },
        },
      ]
    } else if (f.properties.other_tags?.match(/"toilets"/)) {
      return [
        {
          a: 'Toilets',
          lonlat: {
            x: f.geometry.coordinates[0],
            y: f.geometry.coordinates[1],
          },
        },
      ]
    } else {
      return []
    }
  })

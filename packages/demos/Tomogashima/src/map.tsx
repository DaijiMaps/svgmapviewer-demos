import {
  MapLayer,
  MapMarkers,
  MapObjects,
  MapSymbols,
} from '@daijimaps/svgmapviewer/carto'
import {
  benchPath,
  guidePostPath,
  infoBoardPath,
  monumentPath,
  statuePath,
  toriiPath,
  tree4x8Path,
} from '@daijimaps/svgmapviewer/carto-objects'
import { MultiPolygon } from '@daijimaps/svgmapviewer/geo'
import './map.css'
import internals from './data/internals.json'

export const getMapLayers: () => MapLayer[] = () => [
  {
    type: 'multipolygon',
    name: 'area',
    data: internals.features.map(
      (f) => f.geometry.coordinates
    ) as unknown as MultiPolygon[],
  },
  {
    type: 'multipolygon',
    name: 'forest',
    filter: (f) =>
      !!f.properties.landuse?.match(/forest/) ||
      !!f.properties.natural?.match(/wood/),
  },
  {
    type: 'multipolygon',
    name: 'water',
    filter: (f) => !!f.properties.natural?.match(/^water$/),
  },
  {
    type: 'line',
    name: 'ditch',
    width: 0.25,
    filter: (f) => !!f.properties.waterway?.match(/^(ditch)$/),
  },
  {
    type: 'line',
    name: 'stream',
    filter: (f) => !!f.properties.waterway?.match(/^(stream)$/),
  },
  {
    type: 'multipolygon',
    name: 'building',
    filter: (f) => !!f.properties.building?.match(/./),
  },
  {
    type: 'line',
    name: 'service',
    filter: (f) => !!f.properties.highway?.match(/^(service)$/),
  },
  {
    type: 'multipolygon',
    name: 'pedestrian-area',
    filter: (f) => !!f.properties.other_tags?.match(/"pedestrian"/),
  },
  {
    type: 'line',
    name: 'footway',
    filter: (f) =>
      !!f.properties.highway?.match(/^(footway|path|pedestrian|steps)$/),
  },
  {
    type: 'line',
    name: 'wall',
    filter: (f) => !!f.properties.barrier?.match(/^(wall|fence)$/),
  },
  {
    type: 'line',
    name: 'retaining-wall',
    filter: (f) => !!f.properties.barrier?.match(/^(retaining_wall)$/),
  },
]

export const getMapObjects: () => MapObjects[] = () => [
  {
    name: 'benches',
    path: benchPath,
    width: 0.05,
    pointsFilter: (f) => !!f.properties.other_tags?.match(/"bench"/),
  },
  {
    name: 'guide-posts',
    path: guidePostPath,
    width: 0.05,
    pointsFilter: (f) => !!f.properties.other_tags?.match(/"guidepost"/),
  },
  {
    name: 'info-boards',
    path: infoBoardPath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"information"=>"(board|map)"/),
  },
  {
    name: 'monument',
    path: monumentPath,
    width: 0.05,
    pointsFilter: (f) => !!f.properties.other_tags?.match(/"historic"=>"memorial"/),
  },
  {
    name: 'statue',
    path: statuePath,
    width: 0.05,
    pointsFilter: (f) => !!f.properties.other_tags?.match(/"artwork_type"=>"statue"/),
  },
  {
    name: 'torii',
    path: toriiPath,
    width: 0.075,
    pointsFilter: (f) => !!f.properties.man_made?.match(/^torii$/),
  },
  {
    name: 'trees1',
    path: tree4x8Path,
    width: 0.15,
    pointsFilter: (f) => !!f.properties.other_tags?.match(/"tree"/),
  },
]

export const getMapSymbols: () => MapSymbols[] = () => [
  {
    name: 'toilets',
    href: '#XToilets',
    pointsFilter: (f) => !!f.properties.other_tags?.match(/"toilets"/),
    centroidsFilter: (f) =>
      !!f.properties.other_tags?.match(/"toilets"/) ||
      f.properties.amenity === 'toilets',
  },
  {
    name: 'parkings',
    href: '#XParking',
    pointsFilter: (f) => !!f.properties.other_tags?.match(/"parking"/),
    centroidsFilter: (f) => !!f.properties.other_tags?.match(/"parking"/),
  },
]

export const getMapMarkers: () => MapMarkers[] = () => [
  {
    name: 'all',
    pointsFilter: (f) => !!f.properties.name?.match(/./),
  },
]

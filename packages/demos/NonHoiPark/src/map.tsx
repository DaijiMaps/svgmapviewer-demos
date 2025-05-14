import {
  MapLayer,
  MapMarkers,
  MapObjects,
  MapSymbols,
} from '@daijimaps/svgmapviewer/carto'
import {
  benchPath,
  entrancePath,
  guidePostPath,
  infoBoardPath,
  monumentPath,
  statuePath,
  toriiPath,
  tree4x8Path,
  vendingMachinePath,
  wasteBasketPath,
} from '@daijimaps/svgmapviewer/carto-objects'
import { MultiPolygon } from '@daijimaps/svgmapviewer/geo'
import internals from './data/internals.json'
import './map.css'

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
    name: 'grass',
    filter: (f) => !!f.properties.landuse?.match(/grass/),
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
    name: 'garden',
    filter: (f) => !!f.properties.leisure?.match(/garden/),
  },
  {
    type: 'multipolygon',
    name: 'water',
    filter: (f) => !!f.properties.natural?.match(/^water$/),
  },
  {
    type: 'line',
    name: 'ditch',
    filter: (f) =>
      !!f.properties.waterway?.match(/^(ditch)$/) &&
      !f.properties.other_tags?.match(/"tunnel"=>"(yes|culvert)"/),
  },
  {
    type: 'line',
    name: 'stream',
    filter: (f) =>
      !!f.properties.waterway?.match(/^(stream)$/) &&
      !f.properties.other_tags?.match(/"tunnel"=>"(yes|culvert)"/),
  },
  {
    type: 'line',
    name: 'river',
    filter: (f) =>
      !!f.properties.waterway?.match(/^(river)$/) &&
      !f.properties.other_tags?.match(/"tunnel"=>"(yes|culvert)"/),
  },
  {
    type: 'multipolygon',
    name: 'building',
    filter: (f) =>
      !!f.properties.building?.match(/./) &&
      !f.properties.building?.match(/roof/),
  },
  {
    type: 'line',
    name: 'footway',
    filter: (f) =>
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/) &&
      !!f.properties.highway?.match(/^(footway|path|pedestrian|steps)$/) &&
      !f.properties.other_tags?.match(/"service"=>/) &&
      !f.properties.other_tags?.match(/"access"=>/),
  },
  {
    type: 'line',
    name: 'footway access',
    filter: (f) =>
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/) &&
      !!f.properties.highway?.match(/^(footway|path|pedestrian|steps)$/) &&
      !f.properties.other_tags?.match(/"service"=>/) &&
      !!f.properties.other_tags?.match(/"access"=>/),
  },
  {
    type: 'line',
    name: 'cycleway',
    filter: (f) =>
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/) &&
      !!f.properties.highway?.match(/^(cycleway)$/) &&
      !f.properties.other_tags?.match(/"service"=>/) &&
      !f.properties.other_tags?.match(/"access"=>/),
  },
  {
    type: 'line',
    name: 'path',
    filter: (f) =>
      //!f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/) &&
      !!f.properties.highway?.match(/^(path|track)$/) &&
      !f.properties.other_tags?.match(/"service"=>/) &&
      !f.properties.other_tags?.match(/"access"=>/),
  },
  {
    type: 'line',
    name: 'service',
    filter: (f) =>
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/) &&
      !!f.properties.highway?.match(/^(service)$/) &&
      !f.properties.other_tags?.match(/"service"=>/) &&
      !f.properties.other_tags?.match(/"access"=>/),
  },
  {
    type: 'line',
    name: 'service access',
    filter: (f) =>
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/) &&
      !!f.properties.highway?.match(/^(service)$/) &&
      !f.properties.other_tags?.match(/"service"=>/) &&
      !!f.properties.other_tags?.match(/"access"=>/),
  },
  {
    type: 'line',
    name: 'road',
    filter: (f) =>
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/) &&
      !!f.properties.highway?.match(/./) &&
      !f.properties.highway?.match(
        /^(footway|path|pedestrian|steps|cycleway|track|service)$/
      ) &&
      !f.properties.other_tags?.match(/"service"=>/) &&
      !f.properties.other_tags?.match(/"access"=>/),
  },
  {
    type: 'multipolygon',
    name: 'pedestrian-area',
    filter: (f) =>
      !!f.properties.other_tags?.match(/"pedestrian"/) &&
      !f.properties.other_tags?.match(/"access"=>/),
  },
  {
    type: 'line',
    name: 'escalator-background',
    filter: (f) =>
      !!f.properties.highway?.match(/^(steps)$/) &&
      !!f.properties.other_tags?.match(/"conveying"=>"yes"/),
  },
  {
    type: 'line',
    name: 'escalator foreground',
    filter: (f) =>
      !!f.properties.highway?.match(/^(steps)$/) &&
      !!f.properties.other_tags?.match(/"conveying"=>"yes"/),
  },
  {
    type: 'line',
    name: 'wall',
    filter: (f) => !!f.properties.barrier?.match(/^(wall)$/),
  },
  {
    type: 'line',
    name: 'fence',
    filter: (f) => !!f.properties.barrier?.match(/^(fence)$/),
  },
  {
    type: 'line',
    name: 'retaining-wall',
    filter: (f) => !!f.properties.barrier?.match(/^(retaining_wall)$/),
  },
  {
    type: 'multipolygon',
    name: 'roof',
    filter: (f) =>
      !!f.properties.building?.match(/./) &&
      !!f.properties.building?.match(/roof/),
  },
]

export const getMapObjects: () => MapObjects[] = () => [
  {
    name: 'benches',
    path: benchPath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"bench"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'entrances',
    path: entrancePath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"entrance"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'guide-posts',
    path: guidePostPath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"guidepost"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'info-boards',
    path: infoBoardPath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"information"=>"(board|map)"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'trees1',
    path: tree4x8Path,
    width: 0.15,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"tree"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'torii',
    path: toriiPath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.man_made?.match(/^torii$/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'monument',
    path: monumentPath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"historic"=>"memorial"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'statue',
    path: statuePath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"artwork_type"=>"statue"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'vending-machine',
    path: vendingMachinePath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"amenity"=>"vending_machine"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'waste-basket',
    path: wasteBasketPath,
    width: 0.05,
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"amenity"=>"waste_basket"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
]

export const getMapSymbols: () => MapSymbols[] = () => [
  {
    name: 'toilets',
    href: '#XToilets',
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"toilets"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
    centroidsFilter: (f) =>
      (!!f.properties.other_tags?.match(/"toilets"/) ||
        f.properties.amenity === 'toilets') &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'parkings',
    href: '#XParking',
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"parking"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
    centroidsFilter: (f) =>
      !!f.properties.other_tags?.match(/"parking"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'drinking-fountains',
    href: '#XDrinkingFountain',
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"amenity"=>"drinking_water"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'elevators',
    href: '#XElevator',
    pointsFilter: (f) =>
      !!f.properties.highway?.match(/elevator/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'escalators',
    href: '#XEscalator',
    midpointsFilter: (f) =>
      !!f.properties.highway?.match(/steps/) &&
      !!f.properties.other_tags?.match(/"conveying"=>"yes"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'stairs',
    href: '#XStairs',
    midpointsFilter: (f) =>
      !!f.properties.highway?.match(/steps/) &&
      !f.properties.other_tags?.match(/"conveying"=>"yes"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'buses',
    href: '#XBus',
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"bus"=>"yes"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
  {
    name: 'informations',
    href: '#XInformation',
    pointsFilter: (f) =>
      !!f.properties.other_tags?.match(/"tourism"=>"information"/) &&
      !!f.properties.other_tags?.match(/"information"=>"office"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
    centroidsFilter: (f) =>
      !!f.properties.other_tags?.match(/"tourist"=>"information"/) &&
      !!f.properties.other_tags?.match(/"information"=>"office"/) &&
      !f.properties.other_tags?.match(/"level"=>"[1-9][^"]*"/),
  },
]

export const getMapMarkers: () => MapMarkers[] = () => [
  {
    name: 'all',
    /*
    pointsFilter: (f) =>
      !!f.properties.name?.match(/./) &&
      // exclude amenity/bus/information
      !f.properties.other_tags?.match(/"(amenity|bus|information)"/),
    */
  },
]

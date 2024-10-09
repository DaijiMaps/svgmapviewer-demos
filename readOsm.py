import glob
import os
import sys

import common

####

prefix = sys.argv[1]

pwd = os.getcwd()

osmFiles = glob.glob('%s/%s/map*.osm' % (pwd, prefix))

addrTmpl = 'A-1f-%s-%s-%d'

prjdir = '%s/%s' % (pwd, prefix)
datdir = prjdir
prjdat = '%s/map.qgz' % prjdir

# Templates
areasGJ = '%s/areas.geojson' % datdir
a1GJ = '%s/address1.geojson' % datdir
a2GJ = '%s/address2.geojson' % datdir
orgGJ = '%s/origin.geojson' % datdir

####

print('Creating project...', file = sys.stderr)
common.createPrj(prjdat)

def osm2gj(osm, layername):
    name = common.path2name(osm)
    return '%s/tmp-%s-%s.geojson' % (datdir, name, layername)

print('Expanding .osm layers...', file = sys.stderr)
for osm in osmFiles:
    name = common.path2name(osm)
    for (layername, _) in common.osmLayerNames:
        outGJ = osm2gj(osm, layername)
        print('Expanding %s:%s...' % (osm, layername), file = sys.stderr)
        common.expandOsm(osm, layername, name, outGJ)

common.exit()

exit()

areas = common.getAreas(areasGJ)

mapLayers = common.readOsm(osmFiles, areas)

for (layername, _) in common.osmLayerNames:
    l = mapLayers[layername]
    gj = '%s/map-%s.geojson' % (datdir, layername)
    common.dumpGeoJSON(l, gj)

common.exit()

exit()

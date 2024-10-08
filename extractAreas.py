#! /Applications/QGIS3.14.app/Contents/MacOS/bin/python

import pathlib
import os
import os.path
import subprocess
import sys

####

prefix = sys.argv[1]
args = sys.argv
args.pop(0)
args.pop(0)
#field = sys.argv[2]
#pattern = sys.argv[3]

addrTmpl = 'A-1f-%s-%s-%d'
docdir = '/Users/uebayasi/Documents'
prjdir = '%s/Sources/DaijiMaps/QGIS' % docdir
datdir = '%s/Sources/DaijiMaps/daijimaps-data/%s' % (docdir, prefix)
prjdat = '%s/%s.qgz' % (prjdir, prefix)

areasGJ = '%s/areas.geojson' % datdir

####

# - Read areas.geojson
# - For each layer (init-<layer>.geojson):
#   - Classify geometries by common.classifyGeometries()
# - Then output to <prefix>-<layer>.geojson

import common

srcGJ = '%s/%s-%s.geojson' % (datdir, 'init', 'multipolygons')
s = common.openVector(srcGJ, 'init-multipolygons')
olayers = []
while len(args) > 0:
    field = args[0]
    args.pop(0)
    pattern = args[0]
    args.pop(0)
    d = common.extractFields(s, "Polygon", field, pattern)
    olayers.append(d)
d = common.mergeVectorLayers(olayers, 'memory:')
common.dumpGeoJSON(d, '%s/areas.geojson' % datdir)
common.dumpGeoJSON(d, '%s/address1.geojson' % datdir)
common.dumpGeoJSON(d, '%s/address2.geojson' % datdir)
o = common.guessOrigin(d)
common.dumpGeoJSON(o, '%s/origin.geojson' % datdir)

# cp areas.geojson internal.geojson
subprocess.call(['cp', '%s/areas.geojson' % datdir, '%s/internal.geojson' % datdir])

# origin: bottom-right -> top-left -> x2

common.exit()

exit()

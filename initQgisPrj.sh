#! /bin/sh

. ./common.sh

prefix=$1

osms=$(
(
find $prefix -name 'map.osm'
find $prefix  -name 'map-*.osm'
) | sort
)

pyqgis ./initQgisPrj.py ${prefix} ${osms}

rm -fr processing

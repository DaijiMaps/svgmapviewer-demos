#! /bin/sh
target=$1
d="/Applications/QGIS3.14.app/Contents/Resources/python"
env \
PYTHONPATH="$PYTHONPATH:$d:$d/plugins:$d/plugins/processing" \
PATH="/Applications/QGIS3.14.app/Contents/MacOS/bin:$PATH" \
QGIS_PREFIX_PATH="/Applications/QGIS3.14.app/Contents/MacOS" \
GDAL_DATA="/Applications/QGIS3.14.app/Contents/Resources/gdal" \
./extractPolygonsByIds.py "$@"

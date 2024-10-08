prefix=$1

QGIS_PREFIX_PATH="/Applications/QGIS-LTR.app/Contents/MacOS"

bin="${QGIS_PREFIX_PATH}/bin"

exe="${bin}/python3.9"

python="${QGIS_PREFIX_PATH}/../Resources/python"

p1=${python}
p2=${python}/plugins
p3=${python}/plugins/processing

PYTHONPATH="${p1}:${p2}:${p3}"

GDAL_DATA="${python}/../gdal"

pyqgis() {
    env -i \
    PATH="${bin}:${PATH}" \
    PYTHONPATH="${PYTHONPATH}" \
    GDAL_DATA="${GDAL_DATA}" \
    QGIS_PREFIX_PATH="${QGIS_PREFIX_PATH}" \
    ${exe} \
    $@
}

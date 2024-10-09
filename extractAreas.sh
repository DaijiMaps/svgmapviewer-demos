#! /bin/sh

. ./common.sh

target=$1

pyqgis ./extractAreas.py "$@"

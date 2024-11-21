#!/usr/bin/env zsh

orig=$1
shift
dirs=$@

for d in ${dirs}; do
  pushd ${orig}
  cp *.html *.init *.json *.ts ../${d}
  cp src/*.* ../${d}/src
  popd
  pushd ${d}
    pnpm install
    ../../tools/getOsm.sh
    ../../tools/pyqgis.sh ../../tools/makeAreas.py
    ../../tools/pyqgis.sh ../../tools/readOsm.py
  popd
done

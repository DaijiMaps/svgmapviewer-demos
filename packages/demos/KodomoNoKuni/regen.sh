extract_cmd=${PWD}/../../../../daijifloors/packages/cli/packages/map-extract-floors/dist/map-extract-floors.js

mkdir -p ./src/data

pushd ./src/data
${extract_cmd} ../assets/floors.svg
popd

#files='
#floors.json
#header.ts
#locs-wide.json
#locs.json
#logo.svg
#params.ts
#shops.json
#'

#for f in ${files}; do
#  cp ${f} data/${f}
#done

pnpx prettier -w src/data

proc() {
  rm src/*.*
  cp ../Expo2025/src/*.* src
  cp ../Expo2025/vite.* .
  cp ../Expo2025/package.json .
  pnpm i
  #../../tools/regen.sh
}

src=$1 # Expo2025

if [ ! -d ${src} ]; then
  echo >&2 "${src} is not a directory"
  exit 1
fi
if [ ! -e ${src}/map.osm ]; then
  echo >&2 "${src}/map.osm does not exist?"
  exit 1
fi

dirs=$( ls -1 */map.osm )

for f in ${dirs}; do
  d=${f%%/map.osm}
  name=${d##*/}
  if [ "$name" = "$src" ]; then
    continue
  fi
  pushd $d >/dev/null
  echo $name
  popd >/dev/null
done

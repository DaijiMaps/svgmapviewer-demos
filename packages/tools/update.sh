name=${PWD##*/}

rm src/*.*
cp ../Expo2025/src/*.* src
cp ../Expo2025/vite.* .
cp ../Expo2025/package.json .
cp ../Expo2025/svgmapviewer.config.ts .
perl -0777 -pi -le "s,Expo 2025,${name},gmos" svgmapviewer.config.ts
pnpm i
../../tools/regen.sh

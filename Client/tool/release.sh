#!/usr/bin/bash

npm run build

folder="../../CampusMessageWall"

if [[ -d $folder ]]; then
  cd $folder;
  git pull;
  rm -rf dist;
  mkdir dist;
  cp -r ../xiaojiaxinCS/Client/dist/* ./dist;
  rm -rf asset;
  mkdir asset;
  cp -r ../xiaojiaxinCS/Client/asset/* ./asset;
  git add .;
  git commit -m 'auto push';
  git push;
  echo 发布完成;
else
  echo '目录不存在';
fi
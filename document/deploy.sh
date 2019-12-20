#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# npm run build

cd dist
rm -rf .git
git init
git add -A
git commit -m '更新文档'

git push -f git@github.com:insaic/neon.git master:gh-pages

cd -
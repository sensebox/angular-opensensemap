#!/bin/bash

npm update

VERSION=$(node --eval "console.log(require('./package.json').version);")

npm test || exit 1

cp src/angular-opensensemap.js dist/

git add dist/angular-opensensemap.js dist/angular-opensensemap-api.js -f

git commit -m "v$VERSION"

git tag v$VERSION -f
git push --tags -f

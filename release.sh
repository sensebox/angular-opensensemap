#!/bin/bash

npm update

VERSION=$(node --eval "console.log(require('./package.json').version);")

npm test || exit 1

npm run prepublish

cp src/angular-opensensemap.js dist/

git add dist/angular-opensensemap.js dist/angular-opensensemap.min.js -f

git commit -m "v$VERSION"

git tag v$VERSION -f
git push --tags -f

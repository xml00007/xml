#!/usr/bin/env bash

rm -rf packages/**/lib packages/**/package-lock.json packages/**/yarn-error.log packages/**/npm-debug.log
rm -rf node_modules __package__ coverage doc lerna-debug.log npm-debug.log *-error.log package-lock.json
find $(pwd) -type d -name node_modules -exec rm -rf {} +
find -L packages -type l -exec rm -- {} +
lerna clean --yes
#!/usr/bin/env bash

cd $1 &&
git config core.sparsecheckout true &&
echo "packages/*" > ../../.git/modules/$1/info/sparse-checkout &&
echo ".gitignore" >> ../../.git/modules/$1/info/sparse-checkout &&
git read-tree -mu HEAD &&
git add -A
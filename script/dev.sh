#!/usr/bin/env bash

NODEMON='./node_modules/.bin/nodemon'
BABELNODE='./node_modules/.bin/babel-node'

dev() {
    NODE_ENV=$3 PORT0=$1 $NODEMON --exec $BABELNODE $2
}

dev $1 $2 $3

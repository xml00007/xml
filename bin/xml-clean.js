#!/usr/bin/env node
const fs = require('fs');
const {title, sh, mustBeLerna} = require('./lib/utils.js');

mustBeLerna();

title('清理项目');
sh('clean.sh');


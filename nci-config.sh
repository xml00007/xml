#!/usr/bin/env bash
echo "
{
  \"scope\": \"@nirvana\",
  \"tpub\": \"http://10.10.232.242:8001\",
  \"pub\": \"http://registry.npm.pub:8001\",
  \"nppub\": \"http://registry.npm.nppub:8001\",
  \"registryUser\": \"gaoletian\",
  \"registryPass\": \"gaoletian\",
  \"registryEmail\": \"gaoletian@finupgroup.com\",
  \"dockerHost\": \"harbor.finupgroup.com\",
  \"dockerGroup\": \"nchannel\",
  \"baseImage\": \"harbor.finupgroup.com/nchannel/phnode:8\",
  \"dockerUser\": \"gaoletian\",
  \"dockerPass\": \"Glt@puhui123\",
  \"sshHost\": \"10.10.232.242\",
  \"sshPort\": \"60000\",
  \"sshUser\": \"tomcat\",
  \"sshPass\": \"123456\"
}" > ~/.ncirc.json

#!/bin/sh

SERVER_PORT="2277"
SERVER_USER="www-user"
SERVER_IP="95.213.237.88"
PATH_ON_SERVER="/var/www-src/demostage.ru/runner"

parcel build src/index.html --out-dir dist

tar cf dist.tar dist

scp -P $SERVER_PORT ./dist.tar $SERVER_USER@$SERVER_IP:$PATH_ON_SERVER/dist.tar
ssh -p $SERVER_PORT $SERVER_USER@$SERVER_IP "cd $PATH_ON_SERVER; rm -rf ./dist; tar xf dist.tar; rm ./dist.tar"

rm dist.tar
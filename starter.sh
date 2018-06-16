#!/bin/sh

#TODO replcae the below environment varibales with your own

export PORT=3000
export PATH=/usr/local/bin:$PATH

#Absolute path to the diretory you installed c-lightning
export LIGHTNING_PATH=/root/.lightning

#Replace these environment varibales with thenkey and secret you or your app generates
export API_KEY=replaceme
export SECRET=replaceme

forever start --sourceDir /var/www/lightning-api ./bin/www >> /var/www/lightning-api/forever-log.txt 2>&1

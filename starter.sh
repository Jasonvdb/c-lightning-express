#!/bin/sh

#This command runs when the server reboots
#@reboot /path/to/starter.sh
if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
	export PORT=3000
    export PATH=/usr/local/bin:$PATH

	#Absolute path to the diretory you installed c-lightning
	export LIGHTNING_PATH=/root/.lightning

	#Replace these environment varibales with thenkey and secret you or your app generates
	export API_KEY=replaceme
	export SECRET=replaceme
    forever start --sourceDir /var/www/lightning-api ./bin/www >> /var/www/lightning-api/forever-log.txt 2>&1
fi

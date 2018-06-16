#!/bin/sh

#This command runs when the server reboots
#@reboot /var/www/c-lightning-express/reboot.sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
	sh starter.sh
fi

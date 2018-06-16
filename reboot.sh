#!/bin/sh

#This command runs when the server reboots and you're using foreverjs
#@reboot /var/www/c-lightning-express/reboot.sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
	sh start-forever.sh
fi

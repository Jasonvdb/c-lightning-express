#!/bin/sh

#If you're using foreverjs
#https://github.com/foreverjs/forever

export PORT=3000
export PATH=/usr/local/bin:$PATH

forever start --sourceDir /var/www/c-lightning-express ./bin/www >> ~/c-lightning-express-forever-log.txt 2>&1

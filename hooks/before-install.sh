#!/bin/bash

if [ "$DEPLOYMENT_GROUP_NAME" == "giisty_frontend_prod" ]
then
    cd /www/wwwroot/chub.tuitify.com
fi

if [ "$DEPLOYMENT_GROUP_NAME" == "giisty_frontend_dev" ]
then
    cd /www/wwwroot/chubdev.tuitify.com
fi

if [ "$DEPLOYMENT_GROUP_NAME" == "giisty_apis_nest_pre_prod_front" ]
then
    cd /www/wwwroot/preprodfrontend.tuitify.com
fi
shopt -s extglob
rm -rf !(@( ".user.ini" ))
find ./ -type f -not \( -name '.user.ini' \) -delete

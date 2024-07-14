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

if [ "$DEPLOYMENT_GROUP_NAME" == "giisty_frontend_prod" ]
then
    pm2 delete chub.tuitify.com
    pm2 start npm --name chub.tuitify.com -- run prod -p 3007
fi

if [ "$DEPLOYMENT_GROUP_NAME" == "giisty_frontend_dev" ]
then
    pm2 delete chubdev.tuitify.com
    pm2 start npm --name chubdev.tuitify.com -- run prod -p 3008
fi

if [ "$DEPLOYMENT_GROUP_NAME" == "giisty_apis_nest_pre_prod_front" ]
then
    pm2 delete preprodfrontend.tuitify.com
    pm2 start npm --name preprodfrontend.tuitify.com -- run prod -p 3007
fi

#!/usr/bin/env bash

echo ">>> Installing DEV dependencies .."
cd /home/vagrant/social/dev
rvmsudo bundle install
sudo npm install
bower install --allow-root
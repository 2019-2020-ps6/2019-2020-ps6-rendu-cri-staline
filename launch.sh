#!/bin/bash
cd back-end
npm start &
cd ..
cd front-end
npm start &
read -p "Server run..."
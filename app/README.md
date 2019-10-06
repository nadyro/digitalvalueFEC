# Launching the projet

In ./app/server, please execute these following commands :

## Port check
Check if your port 4200, 3000 and 27017 are already in use. 
If so, kill the processes using them.
## Install dependencies
npm install
## Launches the server
node app.js
## Creates the two needed files for the database to work
mkdir -p data/db
## Launches mongo demon and specifying the database folder
mongod --dbpath data/db
## Launches MongoDB's host
mongo --host mongodb://localhost/fec 

In ./app/frontendchallenge-app, please execute the following command :

## Install dependencies
npm install
## Launches angular client
ng serve

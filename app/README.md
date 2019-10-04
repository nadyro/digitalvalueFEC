# Launching the projet

In ./app/server, please execute these following commands :

## Launches the server
node app.js
## Creates the two needed files for the database to work
mkdir -p data/db
## Launches mongo demon and specifying the database folder
mongod --dbpath data/db
## Launches MongoDB's host
mongo --host mongodb://localhost/fec 

In ./app/frontendchallenge-app, please execute the following command :

## Launches angular client
ng serve

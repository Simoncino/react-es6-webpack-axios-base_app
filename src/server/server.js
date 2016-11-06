'use strict';

const Hapi = require('hapi');
const Path = require('path');

//const MongoClient = require('mongodb').MongoClient //The official MongoDB driver for Node.js

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/testAxios', 
    handler: function (request, reply) {
        let result = {
            "success": true, 
            "message": "This is the result from server by axios call.", 
            "random_number": Math.floor((Math.random() * 10) + 1)
        }
        return reply(result);
    }
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/app_name/{param*}',
        handler: {
            directory: {
                path: 'src/client'/*,
                listing: true*/
            }
        }
    });
});

/***********MONGODB start*************/
/*let  url = 'mongodb://?db_username?:?db_password?@ds049925.mlab.com:49925/?db_mongolab?';

server.route({
    method: 'GET',
    path:'/testMongoAxios', 
    handler: testCallToMongoLab
});

function testCallToMongoLab(request, reply) {
    console.log('testCallToMongoLab(request, reply)');


    MongoClient.connect(url, function(err, db) {
        console.log("MongoClient.connect");

        let collection = db.collection('test1');
        collection.find({}).toArray(function(err, docs) {
            reply(docs);
        });
        db.close();
    });

}*/
/***********MONGODB end***************/


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});


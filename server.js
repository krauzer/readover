const db = require('./db/db.js');

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();

const connection = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000'
}

server.connection(connection);

server.register(Inert, function(){});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: 'client/app/views/index.html'
  }
});

server.route({
  method: 'GET',
  path: '/assets/{path*}',
  handler: {
    directory: {
      path: './client/dist'
    }
  }
});

server.start(function(){
  console.log('Listening on ' + server.info.uri);
});


const routes = require('next-routes')();


routes
    .add('/admin', '/admin')
    .add('/', '/index');

modeule.exports = routes;
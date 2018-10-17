const routes = require('next-routes')();


routes
    .add('/admin', '/admin')
    .add('/test', '/test')
    .add('/dashboard', '/dashboard')
    .add('/', '/index');

module.exports = routes;
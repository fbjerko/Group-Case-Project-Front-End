const routes = require('next-routes')();


routes
    .add('/', '/index')
    .add('/dashboard', '/dashboard')
    .add('/admindashboard', '/admindashboard')
    .add('/test', '/test')
  ;

module.exports = routes;
const routes = require('next-routes')();


routes
    .add('/', '/index')
    .add('/dashboard', '/dashboard')
    .add('/admin', '/admin')
    .add('/admin/users', '/admin/users')
    .add('/admin/teams', '/admin/teams')
    .add('/admin/matches', '/admin/matches')
    .add('/admin/create', '/admin/create')
    .add('/test', '/test')
  ;

module.exports = routes;
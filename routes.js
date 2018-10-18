const routes = require('next-routes')();


routes
    .add('/', '/index')
    .add('/dashboard', '/dashboard')
    .add('/admin', '/admin')
    .add('/admin/users', '/admin/users')
    .add('/admin/players', '/admin/players')
    .add('/admin/coaches', '/admin/coaches')
    .add('/admin/teams', '/admin/teams')
    .add('/admin/matches', '/admin/matches')
    .add('/admin/stadiums', '/admin/stadiums')
    .add('/test', '/test')
  ;

module.exports = routes;
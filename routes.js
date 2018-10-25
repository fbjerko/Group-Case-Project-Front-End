const routes = require('next-routes')();


routes
    .add('/', '/index')
    .add('/dashboard', '/dashboard')
    .add('/admin', '/admin')

    .add('/admin/players', '/admin/players')
    .add('/admin/managers', '/admin/coaches')
    .add('/admin/teams', '/admin/teams')
    .add('/admin/matches', '/admin/matches')
    .add('/admin/stadiums', '/admin/stadiums')

    .add('/admin/general', '/admin/general')
    .add('/admin/general/users', '/admin/general/users')
    .add('/admin/general/address', '/admin/general/address')
    .add('/admin/general/associations', '/admin/general/associations')
    .add('/admin/general/goaltypes', '/admin/general/goaltypes')
    .add('/admin/general/location', '/admin/general/location')
    .add('/admin/general/season', '/admin/general/season')

    
    .add('/admin/roles/owners', '/admin/roles/owners')
    .add('/admin/roles/persons', '/admin/roles/person')
    
  ;

module.exports = routes;
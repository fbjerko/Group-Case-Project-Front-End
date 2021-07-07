const routes = require('next-routes')();



routes
    .add('/', '/index')
    .add('/dashboard', '/dashboard')
    .add('/admin', '/admin')

    .add('/dashboard/players', '/user/_players')
    .add('/dashboard/managers', '/user/_managers')
    .add('/dashboard/teams', '/user/_teams')
    .add('/dashboard/matches', '/user/_matches')
    .add('/dashboard/stadiums', '/user/_stadiums')

    .add('/admin/players', '/admin/players')
    .add('/admin/managers', '/admin/managers')
    .add('/admin/teams', '/admin/teams')
    .add('/admin/matches', '/admin/matches')
    .add('/admin/stadiums', '/admin/stadiums')
    .add('/admin/documentation', 'admin/documentation')

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
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  require('./app')
  require('./auth')
}).namespace('App/Controllers/Http')

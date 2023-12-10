import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'SessionsController.create').as('sessions.create')
    Route.post('/sessions', 'SessionsController.store').as('sessions.store')
    Route.get('/logout', 'SessionsController.destroy').as('sessions.destroy')

    Route.get('/gitlab', 'GitlabController.create').as('gitlab.create')
    Route.get('/gitlab/callback', 'GitlabController.store').as('gitlab.store')

    Route.get('/register', 'RegistersController.create').as('registers.create')
    Route.post('/registers', 'RegistersController.store').as('registers.store')

    Route.get('/forgot', 'PasswordResetsController.create').as('passwordResets.create')
    Route.post('/forgot', 'PasswordResetsController.store').as('passwordResets.store')

    Route.get('/reset', 'PasswordResetsController.edit').as('passwordResets.edit')
    Route.post('/reset', 'PasswordResetsController.update').as('passwordResets.update')
})
    .as('auth')
    .namespace('App/Controllers/Http/Auth')

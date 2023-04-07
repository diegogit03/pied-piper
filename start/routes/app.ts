import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/files', 'FilesController.index').as('files.index')
  Route.post('/files', 'FilesController.store').as('files.store')
  Route.delete('/files/:id', 'FilesController.destroy').as('files.destroy')

  Route.get('/shared', 'SharedController.index').as('shared.index')
})
  .as('app')
  .namespace('App')

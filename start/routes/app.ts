import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/root', 'FoldersController.show').as('show')
    Route.post('/:folder?', 'FoldersController.store').as('store')
    Route.delete('/:folder', 'FoldersController.destroy').as('destroy')

    Route.post('/:folder/files', 'FilesController.store').as('files.store')
    Route.delete('/:folder/files/:file', 'FilesController.destroy').as('files.destroy')
  })
    .as('folders')
    .prefix('folders')

  Route.get('/home', 'FilesController.index').as('home')
  Route.get('/shared', 'SharedController.index').as('shared.index')
})
  .middleware('auth')
  .as('app')
  .namespace('App/Controllers/Http/App')

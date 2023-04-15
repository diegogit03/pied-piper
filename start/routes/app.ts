import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/:folder', 'FoldersController.store').as('store')
    Route.delete('/:folder', 'FoldersController.destroy').as('destroy')

    Route.get('/:folder/files', 'FilesController.index').as('files.index')
    Route.post('/:folder/files', 'FilesController.store').as('files.store')
    Route.delete('/:folder/files/:id', 'FilesController.destroy').as('files.destroy')
  })
    .as('folders')
    .prefix('folders')

  Route.get('/shared', 'SharedController.index').as('shared.index')
})
  .as('app')
  .namespace('App/Controllers/Http/App')

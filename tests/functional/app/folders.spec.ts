import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Folder from 'App/Models/Folder'
import UserFactory from 'Database/factories/UserFactory'

test.group('Folders', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('It should make a folder', async ({ client }) => {
    const user = await UserFactory.with('folders', 1).create()

    const response = await client
      .post('/folders')
      .json({
        name: 'test',
      })
      .loginAs(user)

    response.assertStatus(201)
    response.assertBodyContains({ name: 'test' })
  })

  test('It should show the root folder', async ({ client }) => {
    const user = await UserFactory.with('folders', 1).create()

    const response = await client.get('/folders/root').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({ files: [], folders: [] })
  })

  test('It should delete a folder', async ({ client, assert }) => {
    const user = await UserFactory.with('folders', 1).create()
    const childFolder = await user.folders[0].related('folders').create({ name: 'test' })

    const response = await client.delete(`/folders/${childFolder.id}`).loginAs(user)

    response.assertStatus(204)

    const result = await Folder.find(childFolder.id)
    assert.isNull(result)
  })
})

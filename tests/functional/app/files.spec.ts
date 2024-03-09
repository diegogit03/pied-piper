import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import UserFactory from 'Database/factories/UserFactory'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'
import File from 'App/Models/File'

test.group('Folders', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test('It should upload a file', async ({ client, assert }) => {
        const user = await UserFactory.with('folders', 1).create()

        const fakeDrive = Drive.fake()
        const fakeFile = await file.generatePng('1mb')

        const response = await client
            .post(`/folders/${user.folders[0].id}/files`)
            .file('files', fakeFile.contents, { filename: fakeFile.name })
            .loginAs(user)

        response.assertStatus(201)
        assert.isTrue(await fakeDrive.exists(fakeFile.name))

        Drive.restore()
    })

    test('It should delete a file', async ({ client, assert }) => {
        const user = await UserFactory.with('folders', 1).create()

        const fakeDrive = Drive.fake('local')
        const fakeFile = await file.generatePng('1mb')
        const childFile = await user.folders[0].related('files').create({
            clientName: fakeFile.name,
            filePath: fakeFile.name,
            type: fakeFile.mime,
            folderId: user.folders[0].id,
        })

        await fakeDrive
            .use('local')
            .put(fakeFile.name, fakeFile.contents, { filename: fakeFile.name })

        const response = await client
            .delete(`/folders/${user.folders[0].id}/files/${childFile.id}`)
            .loginAs(user)

        response.assertStatus(204)
        assert.isFalse(await fakeDrive.exists(fakeFile.name))

        const result = await File.find(childFile.id)
        assert.isNull(result)

        fakeDrive.restore('local')
    })
})

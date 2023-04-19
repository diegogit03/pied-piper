import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Folder from 'App/Models/Folder'

export default class FoldersController {
  public async store({
    params: { folder: parentFolderId },
    request,
    response,
    auth,
  }: HttpContextContract) {
    const user = auth.user!
    let folder

    if (parentFolderId) {
      const parentFolder = await Folder.findOrFail(parentFolderId)

      folder = await Folder.create({
        name: request.body.name,
        folderId: parentFolder.id,
      })
    } else {
      const rootFolder = await user
        .related('folders')
        .query()
        .whereRaw('"folders"."folder_id" is null')
        .firstOrFail()

      folder = await Folder.create({
        name: request.body.name,
        folderId: rootFolder.id,
      })
    }

    return response.created(folder)
  }

  @bind()
  public async destroy({ response }: HttpContextContract, folder: Folder) {
    await folder.delete()

    return response.noContent()
  }
}

import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Folder from 'App/Models/Folder'
import Ws from 'App/Services/Ws'

export default class FoldersController {
  public async show({ auth }: HttpContextContract) {
    const user = auth.user!

    const rootFolder = await user
      .related('folders')
      .query()
      .whereRaw('"folders"."folder_id" is null')
      .preload('folders')
      .preload('files')
      .firstOrFail()

    return rootFolder
  }

  public async store({
    params: { folder: parentFolderId },
    request,
    response,
    auth,
  }: HttpContextContract) {
    const { name } = request.only(['name'])
    const user = auth.user!
    let parentFolder

    if (parentFolderId) {
      parentFolder = await Folder.findOrFail(parentFolderId)
    } else {
      parentFolder = await user
        .related('folders')
        .query()
        .whereRaw('"folders"."folder_id" is null')
        .firstOrFail()
    }

    const folder = await Folder.create({
      name,
      folderId: parentFolder.id,
    })

    Ws.io.to(`folder:${parentFolder.id}`).emit('created:folder', folder)

    return response.created(folder)
  }

  @bind()
  public async destroy({ response }: HttpContextContract, folder: Folder) {
    await folder.delete()

    Ws.io.to(`folder:${folder.folderId}`).emit('removed:folder', folder)

    return response.noContent()
  }
}

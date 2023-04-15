import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Folder from 'App/Models/Folder'

export default class FoldersController {
  @bind()
  public async store({ request, response }: HttpContextContract, parentFolder: Folder) {
    const folder = await Folder.create({
      name: request.body.name,
      folderId: parentFolder.id,
    })

    return response.created(folder)
  }

  @bind()
  public async destroy({ response }: HttpContextContract, folder: Folder) {
    await folder.delete()

    return response.noContent()
  }
}

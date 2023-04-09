import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import { bind } from '@adonisjs/route-model-binding'
import Folder from 'App/Models/Folder'

export default class FilesController {
  public async index({}: HttpContextContract) {}

  @bind()
  public async store({ request }: HttpContextContract, folder: Folder) {
    const files = request.files('files')

    for (let file of files) {
      const filePath = file.clientName
      await File.create({
        clientName: file.clientName,
        filePath,
        type: file.type,
        folderId: folder.id,
      })
      await file.moveToDisk('./', {
        name: filePath,
      })
    }
  }

  public async destroy({}: HttpContextContract) {}
}

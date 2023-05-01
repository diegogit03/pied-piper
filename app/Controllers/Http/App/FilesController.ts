import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import { bind } from '@adonisjs/route-model-binding'
import Folder from 'App/Models/Folder'
import Drive from '@ioc:Adonis/Core/Drive'

async function createFile(file: any, folder: Folder): Promise<File> {
  const filePath = file.clientName

  const createdFile = await File.create({
    clientName: file.clientName,
    filePath,
    type: file.type,
    folderId: folder.id,
  })

  await file.moveToDisk('./', {
    name: filePath,
  })

  return createdFile
}

export default class FilesController {
  public async index({ view }: HttpContextContract) {
    return view.render('app/files')
  }

  @bind()
  public async store({ request, response }: HttpContextContract, folder: Folder) {
    const files = request.files('files')

    const createFilesPromises = files.map((file) => createFile(file, folder))
    const createdFiles = await Promise.all(createFilesPromises)

    return response.created(createdFiles)
  }

  @bind()
  public async destroy({ response }: HttpContextContract, _: Folder, file: File) {
    await file.delete()

    await Drive.delete(file.filePath)

    return response.noContent()
  }
}

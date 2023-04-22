import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import { bind } from '@adonisjs/route-model-binding'
import Folder from 'App/Models/Folder'

async function createFile(file: any, folder: Folder): Promise<File> {
  const filePath = file.clientName

  const createdFile = await File.create({
    clientName: file.clientName,
    filePath,
    type: file.type,
    folderId: folder.id,
  })
  console.log(createFile)

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
  public async destroy({ response }: HttpContextContract, file: File) {
    await file.delete()

    return response.noContent()
  }
}

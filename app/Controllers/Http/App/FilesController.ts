import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from 'App/Models/File'
import { bind } from '@adonisjs/route-model-binding'
import Folder from 'App/Models/Folder'
import Drive from '@ioc:Adonis/Core/Drive'
import Ws from 'App/Services/Ws'

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
    public async index({ inertia, auth }: HttpContextContract) {
        const user = auth.user!

        const rootFolder = await user
            .related('folders')
            .query()
            .whereRaw('"folders"."folder_id" is null')
            .preload('folders')
            .preload('files')
            .firstOrFail()

        return inertia.render('Files', { rootFolder })
    }

    @bind()
    public async store({ request, response }: HttpContextContract, folder: Folder) {
        const files = request.files('files')

        const createFilesPromises = files.map((file) => createFile(file, folder))
        const createdFiles = await Promise.all(createFilesPromises)

        Ws.io.to(`folder:${folder.id}`).emit('upload', createdFiles)

        return response.created(createdFiles)
    }

    @bind()
    public async destroy({ response }: HttpContextContract, file: File) {
        await file.delete()

        await Drive.delete(file.filePath)

        Ws.io.to(`folder:${file.folderId}`).emit('deleted:file', file)

        return response.noContent()
    }
}

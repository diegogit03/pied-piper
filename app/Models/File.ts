import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Folder from './Folder'

export default class File extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public clientName: string

    @column()
    public filePath: string

    @column()
    public type: string

    @column()
    public folderId: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Folder)
    public folder: BelongsTo<typeof Folder>
}

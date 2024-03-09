import { DateTime } from 'luxon'
import {
    BaseModel,
    BelongsTo,
    HasMany,
    ManyToMany,
    belongsTo,
    column,
    hasMany,
    manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import File from './File'

export default class Folder extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public folderId: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @manyToMany(() => User)
    public users: ManyToMany<typeof User>

    @belongsTo(() => Folder)
    public folder: BelongsTo<typeof Folder>

    @hasMany(() => Folder)
    public folders: HasMany<typeof Folder>

    @hasMany(() => File)
    public files: HasMany<typeof File>
}

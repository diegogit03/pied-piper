import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
    column,
    beforeSave,
    BaseModel,
    HasMany,
    hasMany,
    manyToMany,
    ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import ResetToken from './ResetToken'
import Folder from './Folder'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public username: string

    @column()
    public email: string

    @column({ serializeAs: null })
    public password: string | null

    @column()
    public gitlabId: string | null

    @column()
    public rememberMeToken: string | null

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => ResetToken)
    public resetTokens: HasMany<typeof ResetToken>

    @manyToMany(() => Folder, {
        pivotTable: 'folders_users',
    })
    public folders: ManyToMany<typeof Folder>

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }
}

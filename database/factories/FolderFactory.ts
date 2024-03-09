import Folder from 'App/Models/Folder'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Folder, ({ faker }) => {
    return {
        name: faker.random.word(),
    }
})
    .relation('folder', () => this)
    .build()

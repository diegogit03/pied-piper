import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'files'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.string('client_name').notNullable()
            table.string('file_path').notNullable()
            table.string('type').notNullable()
            table.integer('folder_id').unsigned().notNullable()

            table.foreign('folder_id').references('id').inTable('folders').onDelete('CASCADE')

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}

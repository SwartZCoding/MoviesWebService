import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().unique()
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE')
      table.string('name', 128).notNullable().unique();
      table.string('description', 2048).notNullable();
      table.timestamp('release_date', { useTz: true });
      table.integer('note', 1).notNullable().defaultTo(5);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime()
  public releaseDate: DateTime

  @column()
  public note: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public toXML(): string {
    return `
      <movie>
        <id>${this.id}</id>
        <name>${this.name}</name>
        <description>${this.description}</description>
        <releaseDate>${this.releaseDate.toISO()}</releaseDate>
        <note>${this.note}</note>
        <createdAt>${this.createdAt.toISO()}</createdAt>
        <updatedAt>${this.updatedAt.toISO()}</updatedAt>
      </movie>
    `;
  }
}

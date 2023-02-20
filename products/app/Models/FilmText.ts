import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FilmText extends BaseModel {
  public static table= 'film_text'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs:"title" })
  public title: string

  @column({ serializeAs:"description" })
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

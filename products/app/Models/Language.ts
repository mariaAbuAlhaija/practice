import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Film from './Film'

export default class Language extends BaseModel {
  public static table= 'languages'

  @column({ isPrimary: true })
  public id: number


  @column({ serializeAs:"name" })
  public name: string

  @hasMany (()=>Film)
  public film: HasMany<typeof Film>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

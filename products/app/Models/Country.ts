import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import City from './City'

export default class Country extends BaseModel {
  public static table= 'countries'
  
  @column({ isPrimary: true })
  public id: number

  @column({serializeAs: "country"})
  public country: string

  @hasMany (()=>City)
  public city : HasMany<typeof City>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

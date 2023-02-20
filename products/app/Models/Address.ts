import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import City from './City'
import Staff from './Staff'
import Store from './Store'

export default class Address extends BaseModel {
  public static table= 'address'

  @column({ isPrimary: true })
  public id: number
  
  @column({ serializeAs:"address" })
  public address: string

  @column({ serializeAs:"address2" })
  public address2: string

  @column({ serializeAs:"district" })
  public district: string

  @column({ serializeAs:"city_id" })
  public cityId: number

  @column({ serializeAs:"postal_code" })
  public postalCode: string

  @column({ serializeAs:"phone" })
  public phone: string

  @belongsTo(()=> City)
  public city: BelongsTo<typeof City>

  @hasMany (()=>Staff)
  public staff: HasMany<typeof Staff>

  @hasMany (()=>Store)
  public store: HasMany<typeof Store>
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

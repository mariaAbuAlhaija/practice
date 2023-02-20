import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Store from './Store'
import Address from './Address'
import Payment from './Payment'
import Rental from './Rental'

export default class Customer extends BaseModel {
  public static table= 'customers'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs:"store_id" })
  public storeId: number

  @column({ serializeAs:"first_name" })
  public firstName: string

  @column({ serializeAs:"last_name" })
  public lastName: string

  @column({ serializeAs:"email" })
  public email: string

  @column({ serializeAs:"address_id" })
  public addressId: number

  @column({ serializeAs:"active" })
  public active: boolean

  @belongsTo (()=> Store)
  public store: BelongsTo<typeof Store>

  @belongsTo (()=> Address)
  public address: BelongsTo<typeof Address>

  @hasMany (()=> Payment)
  public payment: HasMany<typeof Payment>

  @hasMany (()=> Rental)
  public rental: HasMany<typeof Rental>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

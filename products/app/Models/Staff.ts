import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Payment from './Payment';
import Rental from './Rental';
import Address from './Address';
import Store from './Store';

export default class Staff extends BaseModel {
  public static table= 'staffs'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: "first_name", })
  public firstName: string;

  @column({ serializeAs: "last_name", })
  public lastName: string;

  @column({ serializeAs:"address_id" })
  public addressId: number

  @column({ serializeAs: "picture", })
  public picture: string;

  @column({ serializeAs: "email", })
  public email: string;
  
  @column({ serializeAs:"store_id" })
  public storeId: number
  
  @column({ serializeAs:"active" })
  public active: boolean
  
  @column({ serializeAs: "username", })
  public username: string;
  
  @column({ serializeAs: "password", })
  public password: string;

  @belongsTo (()=>Address)
  public address: BelongsTo<typeof Address>

  @belongsTo (()=>Store)
  public store: BelongsTo<typeof Store>

  @hasMany (()=>Payment)
  public payment: HasMany<typeof Payment>

  @hasMany (()=>Rental)
  public rental: HasMany<typeof Rental>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address';
import Country from './Country';

export default class City extends BaseModel {
  public static table= 'cities'
  
  @column({ isPrimary: true })
  public id: number
  
  @column({ serializeAs: "city", })
  public city: string;
  
  @column({ serializeAs: "country_id", })
  public countryId: number;

  @hasMany(() => Address)
  public address: HasMany<typeof Address>
  
  @belongsTo (()=>Country)
  public country: BelongsTo<typeof Country>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

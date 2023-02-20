import { DateTime, InvalidZone } from 'luxon'
import { BaseModel, column, hasMany, belongsTo, HasMany, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Address from './Address'
import Inventory from './Inventory'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number
 
  @column({ serializeAs: "manager_staff_id" })
  public managerStaffId: number
 
  @column({ serializeAs: "address_id" })
  public addressId: number

  @hasMany(() =>Customer)
  public customer: HasMany<typeof Customer>

  @hasMany(() =>Inventory)
  public inventory: HasMany<typeof Inventory>
  
  @belongsTo(()=> Address)
  public city: BelongsTo<typeof Address>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

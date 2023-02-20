import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Payment from './Payment'
import Inventory from './Inventory'
import Customer from './Customer'
import Staff from './Staff'

export default class Rental extends BaseModel {
  public static table= 'rentals'

  @column({ isPrimary: true })
  public id: number

  
  @column({ serializeAs:"rental_date" })
  public rentalDate: DateTime
  
  @column({ serializeAs:"inventory_id" })
  public inventoryId: number
  
  @column({ serializeAs:"customer_id" })
  public customerId: number
  
  @column({ serializeAs:"return_date" })
  public returnDate: DateTime
  
  @column({ serializeAs:"staff_id" })
  public staffId: number
  
  @belongsTo (()=>Inventory)
  public inventory: BelongsTo<typeof Inventory>
  
  @belongsTo (()=>Customer)
  public customer: BelongsTo<typeof Customer>
  
  @belongsTo (()=>Staff)
  public staff: BelongsTo<typeof Staff>

  @hasMany (()=>Payment)
  public payment: HasMany<typeof Payment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

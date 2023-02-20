import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import Staff from './Staff'
import Rental from './Rental'

export default class Payment extends BaseModel {
  public static table= 'payments'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs:"customer_id" })
  public customerId: number

  @column({ serializeAs:"staff_id" })
  public staffId: number

  @column({ serializeAs:"rental_id" })
  public rentalId: number

  @column({ serializeAs:"amount" })
  public amount: number

  @column({ serializeAs:"payment_date" })
  public paymentDate: DateTime

  @belongsTo (()=>Customer)
  public customer: BelongsTo<typeof Customer>

  @belongsTo (()=>Staff)
  public staff: BelongsTo<typeof Staff>

  @belongsTo (()=>Rental)
  public rental: BelongsTo<typeof Rental>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

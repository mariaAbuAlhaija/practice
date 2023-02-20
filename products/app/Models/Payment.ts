import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Payment extends BaseModel {
  public static table= 'payments'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs:"customer_id" })
  public customerId: number

  @column({ serializeAs:"staff_id" })
  public staffId: number

  @column({ serializeAs:"rental_id" })
  public rental_id: number

  @column({ serializeAs:"amount" })
  public amount: number

  @column({ serializeAs:"payment_date" })
  public paymentDate: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

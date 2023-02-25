import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

// Route.get('films', async () => {
//   return Database.from('films').select('*')
// })

Route.group(()=>{
  Route.post('/',  "UsersController.create")
  Route.post('/login',  "UsersController.login")
  Route.post('/logout',  "UsersController.logout")
}).prefix('/users')

Route.group(()=>{
  Route.post('/',  "ActorsController.create")
  Route.put('/',  "ActorsController.update")
  Route.delete('/:id',  "ActorsController.destory")
  Route.get('/:id',  "ActorsController.getById")
  Route.get('/',  "ActorsController.getAll") 
}).prefix('/actors')

Route.group(()=>{
  Route.post('/',  "AddressesController.create")
  Route.put('/',  "AddressesController.update")
  Route.delete('/:id',  "AddressesController.destory")
  Route.get('/:id',  "AddressesController.getById")
  Route.get('/',  "AddressesController.getAll") 
}).prefix('/addresses')

Route.group(()=>{
  Route.post('/',  "CategoriesController.create")
  Route.put('/',  "CategoriesController.update")
  Route.delete('/:id',  "CategoriesController.destory")
  Route.get('/:id',  "CategoriesController.getById")
  Route.get('/',  "CategoriesController.getAll") 
}).prefix('/categories')

Route.group(()=>{
  Route.post('/',  "CitiesController.create")
  Route.put('/',  "CitiesController.update")
  Route.delete('/:id',  "CitiesController.destory")
  Route.get('/:id',  "CitiesController.getById")
  Route.get('/',  "CitiesController.getAll") 
}).prefix('/cities')

Route.group(()=>{
  Route.post('/',  "CountriesController.create")
  Route.put('/',  "CountriesController.update")
  Route.delete('/:id',  "CountriesController.destory")
  Route.get('/:id',  "CountriesController.getById")
  Route.get('/',  "CountriesController.getAll") 
}).prefix('/countries')

Route.group(()=>{
  Route.post('/',  "CustomersController.create")
  Route.put('/',  "CustomersController.update")
  Route.delete('/:id',  "CustomersController.destory")
  Route.get('/:id',  "CustomersController.getById")
  Route.get('/',  "CustomersController.getAll") 
}).prefix('/customers')

Route.group(()=>{
  Route.post('/',  "FilmsController.create")
  Route.put('/',  "FilmsController.update")
  Route.delete('/:id',  "FilmsController.destory")
  Route.get('/:id',  "FilmsController.getById")
  Route.get('/',  "FilmsController.getAll") 
}).prefix('/films')

Route.group(()=>{
  Route.post('/',  "InventoriesController.create")
  Route.put('/',  "InventoriesController.update")
  Route.delete('/:id',  "InventoriesController.destory")
  Route.get('/:id',  "InventoriesController.getById")
  Route.get('/',  "InventoriesController.getAll") 
}).prefix('/inventories')

Route.group(()=>{
  Route.post('/',  "LanguagesController.create")
  Route.put('/',  "LanguagesController.update")
  Route.delete('/:id',  "LanguagesController.destory")
  Route.get('/:id',  "LanguagesController.getById")
  Route.get('/',  "LanguagesController.getAll") 
}).prefix('/languages')

Route.group(()=>{
  Route.post('/',  "PaymentsController.create")
  Route.put('/',  "PaymentsController.update")
  Route.delete('/:id',  "PaymentsController.destory")
  Route.get('/:id',  "PaymentsController.getById")
  Route.get('/',  "PaymentsController.getAll") 
}).prefix('/payments')

Route.group(()=>{
  Route.post('/',  "RentalsController.create")
  Route.put('/',  "RentalsController.update")
  Route.delete('/:id',  "RentalsController.destory")
  Route.get('/:id',  "RentalsController.getById")
  Route.get('/',  "RentalsController.getAll") 
}).prefix('/rentals')

Route.group(()=>{
  Route.post('/',  "StaffController.create")
  Route.post('/upload',  "StaffController.uploadImage")
  Route.post('/uploadToDrive',  "StaffController.uploadToDrive")
  Route.put('/',  "StaffController.update")
  Route.delete('/:id',  "StaffController.destory")
  Route.get('/:id',  "StaffController.getById")
  Route.get('/',  "StaffController.getAll") 
}).prefix('/staffs')

Route.group(()=>{
  Route.post('/',  "StoresController.create")
  Route.put('/',  "StoresController.update")
  Route.delete('/:id',  "StoresController.destory")
  Route.get('/:id',  "StoresController.getById")
  Route.get('/',  "StoresController.getAll") 
}).prefix('/stores')

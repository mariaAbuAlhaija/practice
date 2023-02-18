import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('films', async () => {
  return Database.from('films').select('*')
})

Route.group(()=>{
  Route.post('/',  "ActorsController.create")
  Route.put('/',  "ActorsController.update")
  Route.delete('/:id',  "ActorsController.destory")
  Route.get('/:id',  "ActorsController.getById")
  Route.get('/',  "ActorsController.getAll") 
}).prefix('/actors')

Route.group(()=>{
  Route.post('/',  "CategoriesController.create")
  Route.put('/',  "CategoriesController.update")
  Route.delete('/:id',  "CategoriesController.destory")
  Route.get('/:id',  "CategoriesController.getById")
  Route.get('/',  "CategoriesController.getAll") 
}).prefix('/categories')

Route.group(()=>{
  Route.post('/',  "CountriesController.create")
  Route.put('/',  "CountriesController.update")
  Route.delete('/:id',  "CountriesController.destory")
  Route.get('/:id',  "CountriesController.getById")
  Route.get('/',  "CountriesController.getAll") 
}).prefix('/countries')

Route.group(()=>{
  Route.post('/',  "StoresController.create")
  Route.put('/',  "StoresController.update")
  Route.delete('/:id',  "StoresController.destory")
  Route.get('/:id',  "StoresController.getById")
  Route.get('/',  "StoresController.getAll") 
}).prefix('/stores')

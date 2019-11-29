'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.on('/').render('login')
Route.on('reg').render('register')
Route.post('register', 'AuthController.register')
Route.post('login', 'AuthController.login')
Route.post('logout', 'AuthController.logout')
Route.get('hosted', 'IdController.hosted')
Route.on('/maindash').render('input').middleware('auth')
Route.post('saveids', 'IdController.store')
Route.post('savenewids', 'IdController.storenew')
Route.get('showids', 'IdController.index')
Route.get('showlat', 'IdController.showlat')
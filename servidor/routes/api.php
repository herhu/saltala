<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('tickets','TicketsController');
Route::apiResource('profiles','ProfilesController');
Route::apiResource('users','UserController');

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::post('logout', 'AuthController@logout');
Route::post('refresh', 'AuthController@refresh');
Route::post('me', 'AuthController@me');


Route::get('tickets/{id}','TicketsController@show');
Route::get('profiles/{id}','ProfilesController@show');

Route::get('users/profile/{id}','UserController@getProfile');
Route::get('tickets/user/{id}','TicketsController@getTicketbyUser');

Route::put('tickets/requested/{id}','TicketsController@setRequested');
Route::put('tickets/user/{id}','TicketsController@setUser');


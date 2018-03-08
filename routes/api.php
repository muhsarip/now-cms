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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('/student', 'StudentController@index');
Route::get('/student/index2', 'StudentController@index2');
Route::get('/student/delete/{id}', ['uses' =>'StudentController@delete']);
Route::get('/student/{id}', ['uses' =>'StudentController@edit']);
Route::post('/student/create', 'StudentController@create');
Route::post('/student/update', 'StudentController@update');


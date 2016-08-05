<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
 */

Route::get('/', function () {
    return view('welcome');
});

Route::any('memory/save-info', 'MemoryController@saveInfo');
Route::any('memory/ranks', 'MemoryController@getHeightScore');



Route::group(['namespace' => 'Api', 'prefix' => 'api/v1', 'middleware' => 'cors'], function () {
    Route::resource('fix-the-leak', 'FixTheLeakController');
    Route::any('ranks', 'FixTheLeakController@getRank');
});
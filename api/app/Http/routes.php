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

Route::get('fix-the-leak/kiosk', function () {
    return view('game.fix-the-leak.kiosk');
});
Route::get('fix-the-leak/arcade', function () {
    return view('game.fix-the-leak.arcade');
});

Route::any('memory/save-info', 'MemoryController@saveInfo')->middleware('cors');
Route::any('memory/ranks', 'MemoryController@getHeightScore')->middleware('cors');

Route::group(['namespace' => 'Api', 'prefix' => 'api/v1', 'middleware' => 'cors'], function () {
    Route::resource('fix-the-leak', 'FixTheLeakController');
    Route::any('ranks', 'FixTheLeakController@getRank');
});

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
    return view('index.index');
});


Route::group(['prefix'=>'fix-the-leak'], function () {
    Route::get('arcade', function () {
        return view('game.fix-the-leak.arcade');
    })->name('fix-the-leak.arcade');
    Route::get('kiosk', function () {
        return view('game.fix-the-leak.kiosk');
    })->name('fix-the-leak.kiosk');
});

Route::group(['prefix'=>'match-the-pair'], function () {
    Route::get('arcade', function () {
        return view('game.match-the-pair.arcade');
    })->name('match-the-pair.arcade');
    Route::get('kiosk', function () {
        return view('game.match-the-pair.kiosk');
    })->name('match-the-pair.kiosk');
});


Route::any('memory/save-info', 'MemoryController@saveInfo')->middleware('cors');
Route::any('memory/ranks', 'MemoryController@getHeightScore')->middleware('cors');

Route::group(['namespace' => 'Api', 'prefix' => 'api/v1', 'middleware' => 'cors'], function () {
    Route::resource('fix-the-leak', 'FixTheLeakController');
    Route::any('ranks', 'FixTheLeakController@getRank');
    Route::post('memory/ranks', 'MemoryController@getRank');
    Route::post('memory', 'MemoryController@store');
});

<?php

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\API\AuthController;
// use App\Http\Controllers\AuthPassportController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware('auth:api')->group(function () {
    Route::get('home', function () {
        return response()->json(Auth::user()->name);
    });
    // Route::resource('products', ProductController::class);
});

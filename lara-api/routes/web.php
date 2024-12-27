<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['data' => ['success']]);
});

Route::get('/login', [AuthController::class, 'redirectToAzure']);

Route::get('/auth/callback', [AuthController::class, 'handleAzureCallback']);


//Route::get('/.well-known/acme-challenge/{tk}', function (string $tk) {
//    return response($tk);
//});

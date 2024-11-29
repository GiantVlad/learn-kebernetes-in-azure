<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['data' => [['key' => 'item1', 'title' => 'The First Item'], ['key' => 'item2', 'title' => 'The Second Item']]]);
});

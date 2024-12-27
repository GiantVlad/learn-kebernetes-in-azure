<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class ApiController extends Controller
{
    public function getData()
    {
        $user = Auth::user();

        return response()->json(
            ['data' => [
                ['key' => 'item1', 'title' => 'The First Item'],
                ['key' => 'item2', 'title' => 'The Second Item']
            ],
            'user_name' => $user ? $user->name : '',
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function redirectToAzure()
    {
        return Socialite::driver('microsoft')->with([
            'scope' => 'openid profile email User.Read',
            'claims' => [
                'id_token' => [],
            ],
        ])->redirect()->header('Accept', 'application/json');
    }

    public function handleAzureCallback(Request $request)
    {
        // try {
            Log::info('login with Azure 1');
            $user = Socialite::driver('microsoft')->user();
            Log::info('login with Azure 2');
            // Handle user logic here (e.g., create/update user in your database)
            $authUser = User::updateOrCreate([
                'email' => $user->getEmail(),
            ], [
                'name' => $user->getName(),
                'azure_id' => $user->getId(),
                'avatar' => $user->getAvatar(),
                'password' => bcrypt(Str::random(10)),
            ]);
            Log::info('login with Azure 3');
            Auth::login($authUser);

            Log::info('Successful login with Azure.');
            $request->session()->regenerate();

            return redirect('https://dev.cloud-workflow.com/admin');
//        } catch (\Exception $e) {
//            Log::error('Failed to login with Azure.');
//            Log::error($e->getMessage());
//            return redirect('/admin')->with('error', 'Failed to login with Azure.');
//        }
    }
}

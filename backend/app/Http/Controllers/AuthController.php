<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return $this->error('', 'Create an account first!', 404);
        }

        if (!Auth::attempt($credentials)) {
            return $this->error('', 'Credentials do not match!', 401);
        }

        $user = User::where('email', $request->email)->first();
        return $this->success([
            'token' => $user->createToken('Api Token of ' . $user->name)->plainTextToken
        ]);
    }

    public function register(StoreUserRequest $request)
    {
        // we validate all the fields
        $request->validated($request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API  Token of ' . $user->name)->plainTextToken
        ]);
    }

    public function logout()
    {
        return response()->json(['This is the logout function ti-ai pula in ma-ta'], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct()
    {
      $this->middleware('auth:api');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
      
        return response($user, 200)
        ->header('Content-Type', 'application/json');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    public function getProfile(User $user, $id)
    {
        $user = User::where('profile_id', $id)->get();
        return response($user, 200)
        ->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user, $id)
    {
        $res = User::destroy($id);
        if ($res) {
            return response()->json([
                'status' => 1,
                'msg' => 'success'
            ]);
        } else {
            return response()->json([
                'status' => 2,
                'msg' => 'fail'
            ]);
        }
    }
}

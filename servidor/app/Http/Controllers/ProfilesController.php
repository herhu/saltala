<?php

namespace App\Http\Controllers;

use App\Profiles;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\Request;

class ProfilesController extends Controller
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
        $profiles = Profiles::all();
      
        return response($profiles, 200)
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

        $request->validate([
            'name' => 'required'
        ]);

        $profiles = Profiles::create([
            'name' => $request->name
          ]);
    
          return new ProfileResource($profiles);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Profiles  $profiles
     * @return \Illuminate\Http\Response
     */
    public function show(Profiles $profiles, $id)
    {
        $profiles = Profiles::find($id);
        return response($profiles, 200)
        ->header('Content-Type', 'application/json');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Profiles  $profiles
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profiles $profiles, $id)
    {
        $res = Profiles::destroy($id);
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

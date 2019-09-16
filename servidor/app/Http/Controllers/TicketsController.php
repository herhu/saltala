<?php

namespace App\Http\Controllers;

use App\Tickets;
use Illuminate\Http\Request;
use App\Http\Resources\TicketResource;

class TicketsController extends Controller
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
        $tickets = Tickets::all();

        foreach ($tickets as $ticket){
            $username = $ticket->user->name;
        }
      
        return response($tickets, 200)
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
            'user_id' => 'required'
        ]);

        $tickets = Tickets::create([
            'user_id' => $request->user_id,
            'requested' => $request->requested
            
          ]);
    
          return new TicketResource($tickets);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Tickets  $tickets
     * @return \Illuminate\Http\Response
     */
    public function show(Tickets $tickets, $id)
    {
        $tickets = Tickets::find($id);
        return response($tickets, 200)
        ->header('Content-Type', 'application/json');
    }

    public function getTicketbyUser(Tickets $tickets, $id)
    {
        $tickets = Tickets::where('user_id', $id)->get();
        return response($tickets, 200)
        ->header('Content-Type', 'application/json');
    }

    public function setRequested(Request $request, Tickets $tickets, $id)
    {
        $res = Tickets::where('id', $id)
       ->update([
           'requested' => $request->requested
        ]);

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

    public function setUser(Request $request, Tickets $tickets, $id)
    {
        $res = Tickets::where('id', $id)
        ->update([
            'user_id' => $request->user_id
         ]);
 
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Tickets  $tickets
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tickets $tickets)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Tickets  $tickets
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tickets $tickets, $id)
    {

        $res = Tickets::destroy($id);
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

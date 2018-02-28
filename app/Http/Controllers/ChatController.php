<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;
use DB;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function getIndex($id){
        $room = DB::table('rooms')->where('id', $id)->first();
        if(!isset($room->id)) $room = null;
        return view('chat', ['room'=>$room]);
    }
    public function removeMessage($id){
        Message::where('id',$id)->delete();
        return ['remove message ok'];
    }
}

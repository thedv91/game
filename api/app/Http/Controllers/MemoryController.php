<?php

namespace App\Http\Controllers;

use App\Memory as Memory;
use App\Http\Requests\Request;
use App\Http\Controllers\Controller;


class MemoryController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */

    public function showProfile($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }

    /*
     * Get 6 best score
     * */
    public function getHeightScore(){
        $ranks = Memory::orderBy('score', 'desc')
            ->take(6)
            ->get();
        return response()->json(['ranks'=>$ranks]);
    }


    /*
     * Save Data
     * @Param('user_name', 'user_email', '')
     *
     * */

    public function saveInfo(\Request $request){
        $datas = \Request::all();

        $memory = new Memory();
        $memory->name = $datas['user_name'];
        $memory->email = $datas['user_email'];
        $memory->moves = $datas['moves'];
        $memory->time = $datas['time'];
        $memory->score = $datas['score'];

        if($memory->save()){
            return response()->json(['status'=>1]);
        }else{
            return response()->json(['status'=>0]);
        }

    }

}
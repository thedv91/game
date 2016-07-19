<?php

namespace App\Http\Controllers;

use App\Memory as Memory;
//use App\Http\Requests\Request;
use Illuminate\Http\Request;
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
    public function getHeightScore(Request $request){

        $user_email = $request->input('email');
        $type = $request->input('type');

        $memories = Memory::where('type',$type)->get();
        $user = Memory::where('email',$user_email)->where('type',$type)->first();

        if(count($user) < 1) {
            $rank = -1;
        }else{

            $user_moves = $user->moves;
            $user_time = $user->time;

            $rank = 1;
            foreach ($memories as $key=> $memory){
                if($memory->time < $user_time ) {
                    $rank++;
                }

                if($memory->time == $user_time && $memory->moves < $user_moves ) {
                    $rank++;
                }

            }

        }



        $tops = Memory::where('type',$type)->orderBy('time', 'asc')->orderBy('moves','asc')
            ->take(6)
            ->get();

        return response()->json(['tops'=> $tops, 'rank'=> $rank]);
    }


    /*
     * Save Data
     * @Param('user_name', 'user_email', '')
     *
     * */

    public function saveInfo(\Request $request){
        $datas = \Request::all();


        $memory = Memory::where('email',$datas['user_email'])->where('type', $datas['type'])->first();

        if(count($memory) < 1){
            $memory = new Memory();
        }

        $memory->name = $datas['user_name'];
        $memory->email = $datas['user_email'];
        $memory->moves = $datas['moves'];
        $memory->time = $datas['time'];
        $memory->score = $datas['score'];
        $memory->type = $datas['type'];

        if($memory->save()){
            return response()->json(['status'=>1]);
        }else{
            return response()->json(['status'=>0]);
        }

    }

}
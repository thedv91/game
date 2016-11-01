<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemoryRequest;
use App\Memory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class MemoryController extends Controller
{

    protected $model;

    public function __construct(Memory $model)
    {
        $this->model = $model;
    }
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
    public function getRank(Request $request)
    {

        $memories = $this->model->where('type', $request->type)->get();
        try {
            $user = $this->model->where('email', $request->email)->where('type', $request->type)->firstOrFail();
            $rank = $this->model->where('score', '<', $user->score)->where('type', $request->type)->count();
            $rank += 1;
        } catch (ModelNotFoundException $e) {
            $rank = -1;
        }

        $tops = $this->model->where('type', $request->type)->orderBy('score', 'ASC')->limit(6)->get();

        return response()->json(['tops' => $tops, 'rank' => $rank]);
    }

    /*
     * Save Data
     * @Param('user_name', 'user_email', '')
     *
     * */

    public function store(MemoryRequest $request)
    {

        try {
            $memory        = Memory::where('email', $request->user_email)->where('type', $request->type)->firstOrFail();
            $memory->moves = $request->moves;
            $memory->time  = $request->time;
            $memory->score = $request->score;
            $memory->type  = $request->type;
        } catch (ModelNotFoundException $e) {
            $memory        = $this->model;
            $memory->name  = $request->user_name;
            $memory->email = $request->user_email;
            $memory->moves = $request->moves;
            $memory->time  = $request->time;
            $memory->score = $request->score;
            $memory->type  = $request->type;

        }
        try {
            $memory->save();
            return response()->json(['status' => 1]);
        } catch (QueryException $e) {
            return response()->json(['status' => 0]);
        }

    }

}

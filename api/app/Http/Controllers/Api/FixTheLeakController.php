<?php

namespace App\Http\Controllers\Api;

use App\FixTheLeak;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class FixTheLeakController extends Controller
{
    protected $model;

    public function __construct(FixTheLeak $model)
    {
        $this->model = $model;
    }

    public function getRank(Request $request)
    {

        $user_email = $request->email;
        $type       = $request->type;
        try {
            $user = $this->model->where('email', $user_email)->where('type', $type)->firstOrFail();
            if ($type == 0) {
                $rank = $this->model->where('score', '>', $user->score)->where('type', $type)->count();
            } else {
                $rank = $this->model->where('score', '<', $user->score)->where('type', $type)->count();
            }

            $rank += 1;
        } catch (ModelNotFoundException $e) {
            $rank = -1;
        }
        if ($type == 0) {
            $datas = $this->model->where('type', $type)->orderBy('score', 'DESC')->limit(6)->get();
        } else {
            $datas = $this->model->where('type', $type)->orderBy('score', 'ASC')->limit(6)->get();
        }

        return response()->json(['tops' => $datas, 'rank' => $rank]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        // var_dump($request->all());die();
        // var_dump(1);die();
        $user_email = $request->input('email');
        $type       = $request->input('type');

        $fixs = FixTheLeak::where('type', $type)->get();
        $user = FixTheLeak::where('email', $user_email)->where('type', $type)->first();

        if (count($user) < 1) {
            $rank = -1;
        } else {

            $user_time = $user->time;

            $rank = 1;
            foreach ($fixs as $key => $fix) {
                if ($fix->score <= $user_time) {
                    $rank++;
                }

            }

        }

        $datas = $this->model->orderBy('score', 'ASC')->limit(6)->get();
        // return response()->json($datas);
        return response()->json(['tops' => $datas, 'rank' => $rank]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datas = \Request::all();

        $fix = FixTheLeak::where('email', $datas['email'])->where('type', $datas['type'])->first();

        if (count($fix) < 1) {
            $fix        = new FixTheLeak();
            $fix->score = $request->score;
        } else {
            if (($fix->score > $request->score) && $datas['type'] == 1) {
                $fix->score = $request->score;
            }

            if (($fix->score < $request->score) && $datas['type'] == 0) {
                $fix->score = $request->score;
            }
        }

        $fix->name  = $request->name;
        $fix->email = $request->email;
        $fix->type  = $request->type;
        try {
            $fix->save();
            return response()->json($fix);
        } catch (QueryException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

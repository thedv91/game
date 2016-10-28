<?php

namespace App\Http\Controllers\Api;

use App\FixTheLeak;
use App\Http\Controllers\Controller;
use App\Http\Requests\FixTheLeakRequest;
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

        try {
            $user = $this->model->where('email', $request->email)->where('type', $request->type)->firstOrFail();
            $rank = $this->model->where('score', '>', $user->score)->where('type', $request->type)->count();
            $rank += 1;
        } catch (ModelNotFoundException $e) {
            $rank = -1;
        }

        $datas = $this->model->where('type', $request->type)->orderBy('score', 'DESC')->limit(6)->get();

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
    public function store(FixTheLeakRequest $request)
    {
        if ($request->score < 0) {
            $request->score = 0;
        }

        try {
            $fix       = $this->model->where('email', $request->email)->where('type', $request->type)->firstOrFail();
            $fix->name = $request->name;
            if ($fix->score < $request->score) {
                $fix->score = $request->score;
            }
        } catch (ModelNotFoundException $e) {
            $fix        = new FixTheLeak;
            $fix->score = $request->score;
            $fix->name  = $request->name;
            $fix->email = $request->email;
            $fix->type  = $request->type;
        }

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

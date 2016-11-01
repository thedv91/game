<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class MemoryRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_name'  => 'required',
            'user_email' => 'required|email',
            'moves'      => 'required|integer',
            'type'       => 'in:0,1',
        ];
    }
}

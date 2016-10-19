<?php

namespace App;

use App\Scopes\ScoreScope;
use Illuminate\Database\Eloquent\Model;

class FixTheLeak extends Model
{
    protected $hidden = [
        'created_at', 'updated_at', 'email',
    ];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new ScoreScope);
    }
}

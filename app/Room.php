<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    //
    protected $table ="rooms";
    public function messages(){
        return $this->hasMany(Message::class);
    }

}

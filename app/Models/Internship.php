<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'logo', 'title', 'company', 'role', 'period', 'start_date', 'end_date', 'missions', 'techs', 'learned'];

    protected $casts = [
        'missions' => 'array',
        'techs' => 'array'
    ];
}

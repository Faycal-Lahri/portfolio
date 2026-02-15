<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'tag', 'description', 'techs', 'role', 'features', 'image', 'link',
        'objectives', 'completion_date', 'simulation_path', 'simulation_type'
    ];

    protected $casts = [
        'techs' => 'array',
        'features' => 'array',
        'objectives' => 'array' // Should be array if we treat it like features, but currently it's TEXT in DB.
    ];
}

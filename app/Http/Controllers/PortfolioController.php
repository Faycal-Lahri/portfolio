<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\AdditionalExperience;
use App\Models\Certification;
use App\Models\Education;
use App\Models\Internship;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('Portfolio', [
            'about' => About::first(),
            'education' => Education::orderBy('start_date', 'desc')->get(),
            'skills' => Skill::all()->groupBy('category'),
            'technologies' => \App\Models\Technology::all(),
            'projects' => Project::all(),
            'internships' => Internship::orderBy('start_date', 'desc')->get(),
            'certifications' => Certification::all(),
            'additionalExp' => AdditionalExperience::all(),
        ]);
    }
}

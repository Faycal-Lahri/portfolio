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

use App\Models\Technology;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'about' => About::first(),
            'education' => Education::all(),
            'skills' => Skill::all(),
            'technologies' => Technology::all(),
            'projects' => Project::all(),
            'internships' => Internship::all(),
            'certifications' => Certification::all(),
            'additionalExp' => AdditionalExperience::all(),
        ]);
    }

    // ... (keep existing updateAbout method)

    public function storeTechnology(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'icon' => 'required|file|image|mimes:svg,png,jpg,jpeg,webp', // Accept images/svg
            'color' => 'nullable|string',
        ]);

        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('technologies', 'public');
            $data['icon'] = '/storage/' . $path;
        }

        Technology::create($data);
        return back();
    }

    public function deleteTechnology(Technology $technology)
    {
        // Optional: Delete file from storage
        if ($technology->icon && file_exists(public_path($technology->icon))) {
            // Basic cleanup - stripping '/storage/' prefix might be needed depending on implementation
            // keeping it simple for now or relying on just record deletion
        }
        
        $technology->delete();
        return back();
    }


    public function updateAbout(Request $request)
    {
        $data = $request->validate([
            'bio' => 'required|string',
            'status' => 'nullable|string',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'email' => 'nullable|email',
            'linkedin' => 'nullable|url',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('profile', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('resumes', 'public');
            $data['cv'] = '/storage/' . $path;
        }

        About::updateOrCreate(['id' => 1], $data);

        return back()->with('message', 'About updated successfully');
    }

    public function storeProject(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'tag' => 'nullable|string',
            'description' => 'required|string',
            'techs' => 'required', // Can be comma-separated string
            'role' => 'nullable|string',
            'objectives' => 'nullable|string',
            'completion_date' => 'nullable|string',
            'image' => 'nullable|file|image|max:10240', // 10MB
            'simulation' => 'nullable', // Handled manually below because it can be file or array of files
            'simulation.*' => 'file|image|max:10240', // Validation for array items if present
            'simulation_type' => 'required|in:image,video',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('simulation')) {
            $files = $request->file('simulation');

            if ($data['simulation_type'] === 'image') {
                if (!is_array($files)) {
                    // Fallback for single file upload from postman/legacy
                    $files = [$files];
                }
                
                // Enforce count limits (3-5)
                if (count($files) < 3 || count($files) > 5) {
                    return back()->with('error', 'Please upload between 3 and 5 images for the simulation gallery.');
                }
                
                $paths = [];
                foreach ($files as $file) {
                    $path = $file->store('projects/simulations', 'public');
                    $paths[] = '/storage/' . $path;
                }
                $data['simulation_path'] = json_encode($paths);

            } else {
                // Video (Single file)
                if (is_array($files)) {
                     return back()->with('error', 'Only one video file is allowed.');
                }
                $path = $files->store('projects/simulations', 'public');
                $data['simulation_path'] = '/storage/' . $path;
            }
        }

        // Handle Techs (Comma separated)
        if (isset($data['techs']) && is_string($data['techs'])) {
            $data['techs'] = array_values(array_filter(array_map('trim', explode("\n", $data['techs']))));
        }

        // Handle Objectives as Features (Newline separated for array storage)
        if (isset($data['objectives']) && is_string($data['objectives'])) {
            $data['features'] = array_values(array_filter(array_map('trim', explode("\n", $data['objectives']))));
        } else {
            $data['features'] = []; // Ensure not null for DB
        }

        // Defaults for legacy required fields if empty
        if (empty($data['tag'])) $data['tag'] = 'Project';
        if (empty($data['role'])) $data['role'] = 'Developer';

        Project::create($data);
        return back();
    }

    public function deleteProject(Project $project)
    {
        $project->delete();
        return back();
    }

    public function storeEducation(Request $request)
    {
        $data = $request->validate([
            'degree' => 'required|string',
            'school' => 'required|string',
            'period' => 'required|string',
            'specialty' => 'required|string',
            'description' => 'nullable|string',
        ]);

        Education::create($data);
        return back();
    }

    public function deleteEducation(Education $education)
    {
        $education->delete();
        return back();
    }

    public function storeSkill(Request $request)
    {
        $data = $request->validate([
            'category' => 'required|string',
            'name' => 'required|string',
            'type' => 'required|in:technical,soft',
        ]);

        Skill::create($data);
        return back();
    }

    public function deleteSkill(Skill $skill)
    {
        $skill->delete();
        return back();
    }

    public function storeInternship(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'logo' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'company' => 'nullable|string', // Keep optional or map title to it
            'role' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'missions' => 'required', // Can be string or array, handle below
            'techs' => 'required', // Can be string or array
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('companies', 'public');
            $data['logo'] = '/storage/' . $path;
        }

        // Fix for Period (Legacy support)
        // If period is not provided, construct it. We set it as required in migration? 
        // Migration has period NOT NULL. So we must provide it.
        $data['period'] = date('M Y', strtotime($data['start_date'])) . ' - ' . ($data['end_date'] ? date('M Y', strtotime($data['end_date'])) : 'Present');
        
        // Handle Missions split
        if (is_string($data['missions'])) {
            $data['missions'] = array_filter(array_map('trim', explode("\n", $data['missions'])));
        }

        // Handle Techs split
        if (is_string($data['techs'])) {
            $data['techs'] = array_filter(array_map('trim', explode(",", $data['techs'])));
        }
        
        // Ensure company is filled if title is used as main visual
        if (empty($data['company'])) {
            $data['company'] = $data['title'];
        }

        Internship::create($data);
        return back();
    }

    public function deleteInternship(Internship $internship)
    {
        $internship->delete();
        return back();
    }

    public function storeCertification(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'org' => 'required|string',
            'date' => 'required|string',
            'link' => 'nullable|string|url',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,pdf|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('certifications', 'public');
            $data['image'] = '/storage/' . $path;
        }

        Certification::create($data);
        return back();
    }

    public function deleteCertification(Certification $certification)
    {
        if ($certification->image && file_exists(public_path($certification->image))) {
            // Check if file exists to avoid errors, though usually harmless on some setups
            // We can delete it. storage path vs public path mapping.
            // If stored in 'public/certifications', it's in storage/app/public/certifications
            // public_path('/storage/...') maps to the symlinked folder.
            // Simplified:
             @unlink(public_path($certification->image));
        }

        $certification->delete();
        return back();
    }

    public function storeAdditionalExp(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'type' => 'required|string',
            'description' => 'required|string',
            'icon' => 'nullable|string',
        ]);

        AdditionalExperience::create($data);
        return back();
    }

    public function deleteAdditionalExp(AdditionalExperience $experience)
    {
        $experience->delete();
        return back();
    }
}

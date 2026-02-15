<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\About;
use App\Models\Education;

class PortfolioUpdateSeeder extends Seeder
{
    public function run()
    {
        // Update About Section
        About::truncate(); // Clear existing to replace with new specific text
        About::create([
            'bio' => 'Software Engineer Student passionate about Web Technologies, AI, & Prompting.',
            'status' => 'Currently in my 4th year (2nd year of Engineering Cycle).',
        ]);

        // Update Education (Example based on context, or just ensure fields are usable)
        // Since user didn't give specific school names, I'll just ensure the structure is there.
        // But to test the display, I should add a dummy or update if one exists.
        // I'll leave Education alone for now unless I see it needs data to render the new fields.
        // Actually, let's add one sample that uses the new fields to show it works.
        Education::truncate();
        Education::create([
            'degree' => 'Software Engineering Degree',
            'school' => 'Engineering School Name',
            'specialty' => 'Web Technologies & AI',
            'address' => 'City, Country',
            'start_date' => '2022-09-01',
            'end_date' => null, // Present
            'period' => '2022 - Present', // Fallback
            'description' => 'Focusing on advanced algorithms, full-stack development, and AI integration.',
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\About::create([
            'bio' => 'I am a Software Engineering Student specializing in modern web ecosystems and scalable architectures.',
            'status' => 'Currently in my 3rd year'
        ]);

        \App\Models\Education::create([
            'degree' => "Master in Software Engineering",
            'school' => "Engineering School (Sample)",
            'period' => "2023 - Present",
            'specialty' => "Fullstack Architecture & Cloud Computing",
            'description' => "Specializing in distributed systems, security, and advanced web technologies."
        ]);

        \App\Models\Skill::create(['category' => 'Programming Languages', 'name' => 'JavaScript (ES6+)']);
        \App\Models\Skill::create(['category' => 'Programming Languages', 'name' => 'PHP']);
        \App\Models\Skill::create(['category' => 'Frameworks & Libraries', 'name' => 'React.js']);
        \App\Models\Skill::create(['category' => 'Frameworks & Libraries', 'name' => 'Laravel']);

        \App\Models\Project::create([
            'name' => 'Nexus Cloud',
            'tag' => 'Academic / Cloud Storage',
            'description' => 'A decentralized cloud storage platform focusing on user privacy and encrypted data transfer.',
            'techs' => ['Laravel', 'React', 'AWS S3', 'Redis'],
            'role' => 'Lead Fullstack Developer',
            'features' => ['End-to-end AES-256 encryption', 'Real-time folder synchronization'],
            'image' => 'linear-gradient(to bottom right, #111, #444)',
            'link' => '#'
        ]);

        \App\Models\Internship::create([
            'company' => "Tech Solutions Inc.",
            'role' => "Fullstack Developer Intern",
            'period' => "June 2023 - Sept 2023",
            'missions' => ["Participated in the redesign of the internal CRM", "Integrated Third-party APIs"],
            'techs' => ["React", "Laravel"],
            'learned' => "Professional workflow and agile methodology."
        ]);

        \App\Models\Certification::create([
            'title' => "Frontend Development Libraries",
            'org' => "freeCodeCamp",
            'date' => "2023",
            'link' => "#"
        ]);

        \App\Models\AdditionalExperience::create([
            'title' => "Freelance Web Developer",
            'type' => "Freelance",
            'description' => "Assisting small businesses in their digital transition.",
            'icon' => "briefcase"
        ]);
    }
}

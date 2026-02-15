<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('internships', function (Blueprint $table) {
            $table->string('type')->default('internship')->after('id'); // work, internship, freelance
            $table->string('title')->nullable()->after('type'); // "Titre"
            $table->date('start_date')->nullable()->after('period');
            $table->date('end_date')->nullable()->after('start_date');
            // We might want to clear 'period' eventually but let's keep it for now or make it nullable?
            // Existing 'role' is 'Poste occupé'.
            // Existing 'missions' is 'Description des missions' (JSON).
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('internships', function (Blueprint $table) {
            $table->dropColumn(['type', 'title', 'start_date', 'end_date']);
        });
    }
};

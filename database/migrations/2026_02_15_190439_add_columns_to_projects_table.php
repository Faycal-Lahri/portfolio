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
        Schema::table('projects', function (Blueprint $table) {
            $table->text('objectives')->nullable();
            $table->string('completion_date')->nullable();
            $table->string('simulation_path')->nullable();
            $table->string('simulation_type')->default('image'); // 'video', 'image'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['objectives', 'completion_date', 'simulation_path', 'simulation_type']);
        });
    }
};

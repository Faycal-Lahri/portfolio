<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProfileController;

Route::get('/', [PortfolioController::class, 'index']);

// Public Admin Routes (No Login Required)
Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

Route::post('/admin/about', [AdminController::class, 'updateAbout'])->name('admin.about.update');

Route::post('/admin/projects', [AdminController::class, 'storeProject'])->name('admin.projects.store');
Route::delete('/admin/projects/{project}', [AdminController::class, 'deleteProject'])->name('admin.projects.delete');

Route::post('/admin/education', [AdminController::class, 'storeEducation'])->name('admin.education.store');
Route::delete('/admin/education/{education}', [AdminController::class, 'deleteEducation'])->name('admin.education.delete');

Route::post('/admin/skills', [AdminController::class, 'storeSkill'])->name('admin.skills.store');
Route::delete('/admin/skills/{skill}', [AdminController::class, 'deleteSkill'])->name('admin.skills.delete');

Route::post('/admin/technologies', [AdminController::class, 'storeTechnology'])->name('admin.technologies.store');
Route::delete('/admin/technologies/{technology}', [AdminController::class, 'deleteTechnology'])->name('admin.technologies.delete');

Route::post('/admin/internships', [AdminController::class, 'storeInternship'])->name('admin.internships.store');
Route::delete('/admin/internships/{internship}', [AdminController::class, 'deleteInternship'])->name('admin.internships.delete');

Route::post('/admin/certifications', [AdminController::class, 'storeCertification'])->name('admin.certifications.store');
Route::delete('/admin/certifications/{certification}', [AdminController::class, 'deleteCertification'])->name('admin.certifications.delete');

Route::post('/admin/additional', [AdminController::class, 'storeAdditionalExp'])->name('admin.additional.store');
Route::delete('/admin/additional/{experience}', [AdminController::class, 'deleteAdditionalExp'])->name('admin.additional.delete');

// Profile routes are typically for auth users, but if you want to remove auth completely, 
// we can either leave them or comment them out if they rely on Auth::user().
// For now, I will comment them out since a public user has no "Profile" to edit.
/* 
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
*/

require __DIR__.'/auth.php';

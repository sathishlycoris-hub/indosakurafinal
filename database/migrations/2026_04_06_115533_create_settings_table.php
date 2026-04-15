<?php

// ============================================================
// STEP 1 — Run this command to generate the migration file:
//   php artisan make:migration create_settings_table
//
// Then paste the content below into the generated file.
// Then run:  php artisan migrate
// ============================================================

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->json('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};

// ============================================================
// STEP 2 — Add these two routes inside your admin route group
//          in routes/web.php  (alongside your existing team routes):
//
//   Route::post('admin/team/reorder',
//       [App\Http\Controllers\Admin\TeamController::class, 'reorder'])
//       ->name('admin.team.reorder');
//
//   Route::post('admin/team/reorder-categories',
//       [App\Http\Controllers\Admin\TeamController::class, 'reorderCategories'])
//       ->name('admin.team.reorderCategories');
//
// ============================================================
// STEP 3 — If you don't already have a sort_order column on teams, run:
//
//   php artisan make:migration add_sort_order_to_teams_table
//
// Migration content:
//
//   Schema::table('teams', function (Blueprint $table) {
//       $table->unsignedInteger('sort_order')->default(0)->after('id');
//   });
//
//   php artisan migrate
// ============================================================
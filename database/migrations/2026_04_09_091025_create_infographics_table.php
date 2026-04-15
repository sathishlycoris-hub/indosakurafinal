<?php

// ============================================================
// STEP 1 — Run:
//   php artisan make:migration create_infographics_table
// Paste this class, then:  php artisan migrate
//
// STEP 2 — Routes in routes/web.php:
//
// Public:
//   Route::get('/infographics', [InfographicPageController::class, 'index'])
//       ->name('infographics.index');
//   Route::get('/infographics/{infographic}', [InfographicPageController::class, 'show'])
//       ->name('infographics.show');
//
// Admin (inside admin middleware group):
//   Route::resource('admin/infographics', \App\Http\Controllers\Admin\InfographicController::class)
//       ->names('admin.infographics');
// ============================================================

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('infographics', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->text('short_description')->nullable();
            $table->text('short_description_ja')->nullable();
            $table->longText('content')->nullable();            // Rich text body
            $table->longText('content_ja')->nullable();
            $table->longText('table_of_contents')->nullable();  // JSON array of TOC items
            $table->longText('table_of_contents_ja')->nullable();
            $table->string('category')->nullable();
            $table->string('category_ja')->nullable();
            $table->string('author')->nullable();
            $table->string('author_ja')->nullable();
            $table->string('image')->nullable();                // Cover / thumbnail
            $table->string('infographic_image')->nullable();    // Tall infographic image
            $table->date('published_date')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('infographics');
    }
};
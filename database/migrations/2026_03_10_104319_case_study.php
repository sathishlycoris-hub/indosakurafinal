<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();

            // Title
            $table->string('title');
            $table->string('title_ja')->nullable();

            // Subtitle
            $table->string('subtitle')->nullable();
            $table->string('subtitle_ja')->nullable();

            // Slug
            $table->string('slug')->unique();

            // Hero Description
            $table->text('hero_description')->nullable();
            $table->text('hero_description_ja')->nullable();

            // Hero Image
            $table->string('hero_image')->nullable();

            // Tags (store as JSON)
            $table->json('tags')->nullable();

            // Content
            $table->longText('content')->nullable();
            $table->longText('content_ja')->nullable();

            // Subject / Benefit
            $table->text('benefit')->nullable();
            $table->text('benefit_ja')->nullable();

            // Implementation
            $table->text('implementation')->nullable();
            $table->text('implementation_ja')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_studies');
    }
};
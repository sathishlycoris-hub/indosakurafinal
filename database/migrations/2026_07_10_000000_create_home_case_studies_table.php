<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_case_studies', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->string('slug')->unique();

            $table->string('subtitle')->nullable();
            $table->string('subtitle_ja')->nullable();

            $table->string('company_name')->nullable();
            $table->string('company_name_ja')->nullable();
            $table->string('ceo_name')->nullable();
            $table->string('ceo_name_ja')->nullable();

            $table->string('logo')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('secondary_image')->nullable();

            $table->string('tags')->nullable();
            $table->string('tags_ja')->nullable();

            $table->longText('hero_description')->nullable();
            $table->longText('hero_description_ja')->nullable();

            // "Subject" box on the show page
            $table->longText('benefit')->nullable();
            $table->longText('benefit_ja')->nullable();

            // "Implementation Effect" box on the show page
            $table->longText('implementation')->nullable();
            $table->longText('implementation_ja')->nullable();

            // Long-form body at the bottom of the show page
            $table->longText('content')->nullable();
            $table->longText('content_ja')->nullable();

            // SEO
            $table->string('meta_title')->nullable();
            $table->string('meta_title_ja')->nullable();
            $table->string('meta_description', 500)->nullable();
            $table->string('meta_description_ja', 500)->nullable();
            $table->string('meta_keywords', 500)->nullable();
            $table->string('meta_keywords_ja', 500)->nullable();
            $table->string('og_image')->nullable();

            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_case_studies');
    }
};

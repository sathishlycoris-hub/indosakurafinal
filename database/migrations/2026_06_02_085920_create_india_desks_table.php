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
        Schema::create('india_desks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->string('slug')->unique();
            $table->string('subtitle')->nullable();
            $table->string('subtitle_ja')->nullable();
            $table->text('hero_description')->nullable();
            $table->text('hero_description_ja')->nullable();
            $table->string('hero_image')->nullable();
            $table->text('supporting_growth')->nullable();
            $table->text('supporting_growth_ja')->nullable();
            $table->text('about')->nullable();
            $table->text('about_ja')->nullable();
            $table->text('about_indosakura')->nullable();
            $table->text('about_indosakura_ja')->nullable();
            $table->text('overview')->nullable();
            $table->text('overview_ja')->nullable();
            $table->string('cta_label')->nullable();
            $table->string('cta_label_ja')->nullable();
            $table->string('cta_url')->nullable();

            // Casted JSON/Array fields
            $table->json('service_items')->nullable();
            $table->json('why_choose')->nullable();
            $table->json('approach_steps')->nullable();
            $table->json('testimonials')->nullable();
            $table->json('tech_stack')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('india_desks');
    }
};

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
        Schema::create('india_desk_pages', function (Blueprint $table) {
            $table->id();
            // Hero Section Fields
            $table->string('hero_title')->nullable();
            $table->string('hero_title_ja')->nullable();
            $table->string('hero_subtitle')->nullable();
            $table->string('hero_subtitle_ja')->nullable();
            $table->text('hero_description')->nullable();
            $table->text('hero_description_ja')->nullable();
            $table->string('hero_image')->nullable();

            // Highlights managed as JSON array for easy bullet listing
            $table->json('highlights')->nullable();

            // Supporting Growth Sections
            $table->text('supporting_growth')->nullable();
            $table->text('supporting_growth_ja')->nullable();
            $table->text('about')->nullable();
            $table->text('about_ja')->nullable();
            $table->text('about_indosakura')->nullable();
            $table->text('about_indosakura_ja')->nullable();

            // General CTA Configuration for the landing page
            $table->string('cta_label')->nullable();
            $table->string('cta_label_ja')->nullable();
            $table->string('cta_url')->nullable();
            $table->timestamps();
        });

        Schema::table('india_desks', function (Blueprint $table) {
            $table->foreignId('india_desk_page_id')->nullable()->after('id')->constrained()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('india_desks', function (Blueprint $table) {
            $table->dropForeign(['india_desk_page_id']);
            $table->dropColumn('india_desk_page_id');
        });
        Schema::dropIfExists('india_desk_pages');
    }
};

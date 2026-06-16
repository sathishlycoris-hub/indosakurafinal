<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add page-level hero fields to a new table (or add to corporate_infos if you prefer)
        Schema::create('corporate_info_pages', function (Blueprint $table) {
            $table->id();
            $table->string('hero_title')->nullable();
            $table->string('hero_title_ja')->nullable();
            $table->string('hero_subtitle')->nullable();
            $table->string('hero_subtitle_ja')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('corporate_info_pages');
    }
};
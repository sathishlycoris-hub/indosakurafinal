<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();

           $table->string('title');
            $table->string('slug')->unique();
            $table->string('subtitle')->nullable();

            $table->text('hero_description')->nullable();
            $table->string('hero_image')->nullable();

            $table->json('features')->nullable();
            $table->json('use_cases')->nullable();
            $table->json('industries')->nullable();
            $table->json('case_studies')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solutions');
    }
};

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
        // 1. India Desk Highlights
        Schema::create('india_desk_highlights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('india_desk_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->string('value')->nullable(); // e.g. 99.9%, 50%+
            $table->text('description')->nullable();
            $table->text('description_ja')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 2. India Desk Benefits
        Schema::create('india_desk_benefits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('india_desk_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->text('description')->nullable();
            $table->text('description_ja')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 3. India Desk Page FAQs (Per-page specific)
        Schema::create('india_desk_page_faqs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('india_desk_id')->constrained()->cascadeOnDelete();
            $table->text('question');
            $table->text('question_ja')->nullable();
            $table->text('answer');
            $table->text('answer_ja')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 4. India Desk Page Industries
        Schema::create('india_desk_page_industries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('india_desk_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->text('description')->nullable();
            $table->text('description_ja')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // 5. India Desk Global FAQs 
        Schema::create('india_desk_faqs', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('india_desk_id')->constrained()->cascadeOnDelete();
            $table->text('question');
            $table->text('question_ja')->nullable();
            $table->text('answer');
            $table->text('answer_ja')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('india_desk_faqs');
        Schema::dropIfExists('india_desk_page_industries');
        Schema::dropIfExists('india_desk_page_faqs');
        Schema::dropIfExists('india_desk_benefits');
        Schema::dropIfExists('india_desk_highlights');
    }
};

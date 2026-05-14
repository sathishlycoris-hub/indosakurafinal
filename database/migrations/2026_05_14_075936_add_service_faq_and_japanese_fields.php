<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Per-service FAQs (separate from the global service_faqs table)
        Schema::create('service_page_faqs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->text('question');
            $table->text('question_ja')->nullable();
            $table->longText('answer');
            $table->longText('answer_ja')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        // Per-service Industries We Serve (separate from the global service_industries table)
        Schema::create('service_page_industries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->longText('description')->nullable();
            $table->longText('description_ja')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_page_industries');
        Schema::dropIfExists('service_page_faqs');
    }
};
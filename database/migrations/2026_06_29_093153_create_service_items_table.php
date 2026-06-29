<?php
// database/migrations/xxxx_create_service_items_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->integer('sort_order')->default(0);

            // Card (shown on parent page)
            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->text('card_description')->nullable();
            $table->text('card_description_ja')->nullable();

            // Hero
            $table->string('subtitle')->nullable();
            $table->string('subtitle_ja')->nullable();
            $table->longText('hero_description')->nullable();
            $table->longText('hero_description_ja')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('cta_label')->nullable();
            $table->string('cta_label_ja')->nullable();
            $table->string('cta_url')->nullable();

            // Introduction
            $table->longText('intro')->nullable();
            $table->longText('intro_ja')->nullable();

            // JSON sections
            $table->json('sub_services')->nullable();   // Internal Knowledge Assistants, Workflow Copilots...
            $table->json('features')->nullable();        // RAG, role-based access...
            $table->json('benefits')->nullable();        // Reduce manual work 70%...
            $table->json('process_steps')->nullable();   // Discovery, AI Strategy...
            $table->json('tech_stack')->nullable();      // {category, items}
            $table->json('industries')->nullable();      // Healthcare, Manufacturing...
            $table->json('why_choose')->nullable();      // Custom AI dev expertise...
            $table->json('faqs')->nullable();            // {question, answer}

            // SEO
            $table->string('meta_title')->nullable();
            $table->string('meta_title_ja')->nullable();
            $table->string('meta_description', 500)->nullable();
            $table->string('meta_description_ja', 500)->nullable();
            $table->string('meta_keywords', 500)->nullable();
            $table->string('meta_keywords_ja', 500)->nullable();
            $table->string('og_image')->nullable();

            $table->timestamps();

            $table->unique(['service_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_items');
    }
};
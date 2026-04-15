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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->enum('language', ['en', 'ja'])->default('en');

            $table->string('title');
            $table->string('title_ja')->nullable(); 

            $table->text('short_description');
            $table->text('short_description_ja')->nullable();

            $table->longText('content');
            $table->longText('content_ja')->nullable();

            $table->string('category');
            $table->string('author')->nullable();

            $table->date('published_date');

            $table->string('image')->nullable();

            $table->enum('status', ['published', 'draft'])->default('published');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};

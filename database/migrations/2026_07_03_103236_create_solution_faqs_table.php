<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('solution_faqs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solution_id')->constrained()->cascadeOnDelete();
            $table->string('question');
            $table->string('question_ja')->nullable();
            $table->text('answer');
            $table->text('answer_ja')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solution_faqs');
    }
};
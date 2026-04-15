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
        Schema::create('solution_masters', function (Blueprint $table) {
            $table->id();
            // Connect to solutions table
            $table->foreignId('solution_id')->constrained('solutions')->onDelete('cascade');

            $table->string('key_title')->nullable();
            $table->longText('key_content')->nullable();

            $table->string('case_title')->nullable();
            $table->longText('case_content')->nullable();

            $table->string('industry_title')->nullable();
            $table->longText('industry_content')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solution_masters');
    }
};

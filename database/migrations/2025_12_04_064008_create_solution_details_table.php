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
        Schema::create('solution_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solution_id')->constrained('solutions')->onDelete('cascade');

            $table->enum('type', ['key', 'case', 'industry']);

            $table->string('title')->nullable();
            $table->string('title_jap')->nullable();

            $table->longText('content')->nullable();
            $table->longText('content_jap')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solution_details');
    }
};

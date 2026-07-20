<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('whitepapers', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('title_ja')->nullable();
            $table->text('description')->nullable();
            $table->text('description_ja')->nullable();
            $table->string('file')->nullable(); // relative storage path to the PDF
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('whitepapers');
    }
};

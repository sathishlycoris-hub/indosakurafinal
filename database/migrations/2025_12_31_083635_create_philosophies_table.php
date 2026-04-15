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
        Schema::create('philosophies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('content');      // ReactQuill HTML
            $table->string('image')->nullable();
            $table->longText('description');  // ReactQuill HTML
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('philosophies');
    }
};

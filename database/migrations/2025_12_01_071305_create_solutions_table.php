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
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->nullable();

            $table->string('title')->nullable();
            $table->string('title_jap')->nullable();

            $table->longText('content')->nullable();
            $table->longText('content_jap')->nullable();

            $table->longText('subcontent')->nullable();
            $table->longText('subcontent_jap')->nullable();

            $table->longText('description')->nullable();
            $table->longText('description_jap')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solutions');
    }
};

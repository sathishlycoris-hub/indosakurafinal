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
        Schema::create('india_desk_industries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id')->nullable();
            $table->string('title');
            $table->string('title_ja')->nullable();
            $table->longText('description'); // React Quill HTML
            $table->longText('description_ja')->nullable(); // React Quill HTML
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('india_desk_industries');
    }
};

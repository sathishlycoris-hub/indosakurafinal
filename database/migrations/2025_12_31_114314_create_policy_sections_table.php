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
        Schema::create('policy_sections', function (Blueprint $table) {
            $table->id();
             $table->foreignId('policy_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('title');        // Section heading
            $table->longText('description'); // ReactQuill HTML
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policy_sections');
    }
};

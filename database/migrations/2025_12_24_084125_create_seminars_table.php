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
        Schema::create('seminars', function (Blueprint $table) {
            $table->id();
              // English
            $table->string('title');
            $table->text('description');
            $table->string('location');

            // Japanese
            $table->string('title_ja')->nullable();
            $table->text('description_ja')->nullable();
            $table->string('location_ja')->nullable();

            // Extra info
            $table->string('participation_fee')->nullable();
            $table->string('participation_fee_ja')->nullable();
            $table->string('organizer')->nullable();
            $table->string('organizer_ja')->nullable();
            $table->string('sponsorship')->nullable();
            $table->string('sponsorship_ja')->nullable();
            $table->string('cooperation')->nullable();
            $table->string('cooperation_ja')->nullable();

            // Event meta
            $table->date('date');
            $table->string('time');
            $table->enum('status', ['upcoming', 'archived'])->default('upcoming');
            $table->json('tags')->nullable();

            // Image
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seminars');
    }
};

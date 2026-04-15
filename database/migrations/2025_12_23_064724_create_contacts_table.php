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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('product_service');
            $table->json('classification');
            $table->text('requests')->nullable();
            $table->string('expected_date');
            $table->string('company_name');
            $table->string('customer_position')->nullable();
            $table->string('department')->nullable();
            $table->string('post')->nullable();
            $table->string('name_en');
            $table->string('name_ja');
            $table->string('address_type');
            $table->string('zip_code');
            $table->string('prefecture')->nullable();
            $table->string('address');
            $table->string('telephone');
            $table->string('email');
            $table->string('language', 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};

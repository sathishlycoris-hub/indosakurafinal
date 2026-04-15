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
        Schema::table('corp_profile_settings', function (Blueprint $table) {
            //
            $table->string('loc1_name')->nullable();
            $table->string('loc1_name_ja')->nullable();
            $table->string('loc1_address')->nullable();
            $table->string('loc1_address_ja')->nullable();
            $table->string('loc2_name')->nullable();
            $table->string('loc2_name_ja')->nullable();
            $table->string('loc2_address')->nullable();
            $table->string('loc2_address_ja')->nullable();
            $table->string('loc3_name')->nullable();
            $table->string('loc3_name_ja')->nullable();
            $table->string('loc3_address')->nullable();
            $table->string('loc3_address_ja')->nullable();
            $table->string('loc4_name')->nullable();
            $table->string('loc4_name_ja')->nullable();
            $table->string('loc4_address')->nullable();
            $table->string('loc4_address_ja')->nullable();
            $table->string('loc5_name')->nullable();
            $table->string('loc5_name_ja')->nullable();
            $table->string('loc5_address')->nullable();
            $table->string('loc5_address_ja')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('corp_profile_settings', function (Blueprint $table) {
            $table->dropColumn([
                'loc1_name',
                'loc1_name_ja',
                'loc1_address',
                'loc1_address_ja',
                'loc2_name',
                'loc2_name_ja',
                'loc2_address',
                'loc2_address_ja',
                'loc3_name',
                'loc3_name_ja',
                'loc3_address',
                'loc3_address_ja',
                'loc4_name',
                'loc4_name_ja',
                'loc4_address',
                'loc4_address_ja',
                'loc5_name',
                'loc5_name_ja',
                'loc5_address',
                'loc5_address_ja',
            ]);
        });
    }
};

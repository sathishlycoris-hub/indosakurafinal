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
        Schema::table('site_settings', function (Blueprint $table) {
            $table->string('nav6_en')->nullable()->after('nav5_href'); $table->string('nav6_ja')->nullable()->after('nav5_href'); $table->string('nav6_href')->nullable()->after('nav5_href');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn(['nav6_en', 'nav6_ja', 'nav6_href']);
        });
    }
};

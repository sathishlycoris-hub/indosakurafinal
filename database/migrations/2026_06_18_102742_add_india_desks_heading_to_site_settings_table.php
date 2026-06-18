<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->string('footer_india_desks_heading_en')
                  ->default('India Desks')
                  ->after('footer_services_heading_ja');

            $table->string('footer_india_desks_heading_ja')
                  ->default('インドデスク')
                  ->after('footer_india_desks_heading_en');
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'footer_india_desks_heading_en',
                'footer_india_desks_heading_ja'
            ]);
        });
    }
};
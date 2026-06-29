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
        $table->string('str_stat1_value_ja')->nullable()->after('str_stat1_value');
        $table->string('str_stat2_value_ja')->nullable()->after('str_stat2_value');
        $table->string('str_stat3_value_ja')->nullable()->after('str_stat3_value');
        $table->string('str_stat4_value_ja')->nullable()->after('str_stat4_value');
    });
}

public function down(): void
{
    Schema::table('corp_profile_settings', function (Blueprint $table) {
        $table->dropColumn([
            'str_stat1_value_ja',
            'str_stat2_value_ja',
            'str_stat3_value_ja',
            'str_stat4_value_ja',
        ]);
    });
}
};

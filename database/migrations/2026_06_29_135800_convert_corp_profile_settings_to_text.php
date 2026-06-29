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
        $table->text('strengths_heading')->nullable()->change();
        $table->text('strengths_heading_ja')->nullable()->change();
        $table->text('strengths_para1')->nullable()->change();
        $table->text('strengths_para1_ja')->nullable()->change();
        $table->text('strengths_para2')->nullable()->change();
        $table->text('strengths_para2_ja')->nullable()->change();
        $table->text('strengths_cta')->nullable()->change();
        $table->text('strengths_cta_ja')->nullable()->change();

        $table->text('str_feat1_desc')->nullable()->change();
        $table->text('str_feat1_desc_ja')->nullable()->change();
        $table->text('str_feat2_desc')->nullable()->change();
        $table->text('str_feat2_desc_ja')->nullable()->change();
        $table->text('str_feat3_desc')->nullable()->change();
        $table->text('str_feat3_desc_ja')->nullable()->change();
        $table->text('str_feat4_desc')->nullable()->change();
        $table->text('str_feat4_desc_ja')->nullable()->change();

        $table->text('loc1_address')->nullable()->change();
        $table->text('loc1_address_ja')->nullable()->change();
        $table->text('loc2_address')->nullable()->change();
        $table->text('loc2_address_ja')->nullable()->change();
        $table->text('loc3_address')->nullable()->change();
        $table->text('loc3_address_ja')->nullable()->change();
        $table->text('loc4_address')->nullable()->change();
        $table->text('loc4_address_ja')->nullable()->change();
        $table->text('loc5_address')->nullable()->change();
        $table->text('loc5_address_ja')->nullable()->change();
    });
}

public function down(): void
{
    Schema::table('corp_profile_settings', function (Blueprint $table) {
        $table->string('strengths_heading')->nullable()->change();
        $table->string('strengths_heading_ja')->nullable()->change();
        $table->string('strengths_para1')->nullable()->change();
        $table->string('strengths_para1_ja')->nullable()->change();
        $table->string('strengths_para2')->nullable()->change();
        $table->string('strengths_para2_ja')->nullable()->change();
        $table->string('strengths_cta')->nullable()->change();
        $table->string('strengths_cta_ja')->nullable()->change();

        $table->string('str_feat1_desc')->nullable()->change();
        $table->string('str_feat1_desc_ja')->nullable()->change();
        $table->string('str_feat2_desc')->nullable()->change();
        $table->string('str_feat2_desc_ja')->nullable()->change();
        $table->string('str_feat3_desc')->nullable()->change();
        $table->string('str_feat3_desc_ja')->nullable()->change();
        $table->string('str_feat4_desc')->nullable()->change();
        $table->string('str_feat4_desc_ja')->nullable()->change();

        $table->string('loc1_address')->nullable()->change();
        $table->string('loc1_address_ja')->nullable()->change();
        $table->string('loc2_address')->nullable()->change();
        $table->string('loc2_address_ja')->nullable()->change();
        $table->string('loc3_address')->nullable()->change();
        $table->string('loc3_address_ja')->nullable()->change();
        $table->string('loc4_address')->nullable()->change();
        $table->string('loc4_address_ja')->nullable()->change();
        $table->string('loc5_address')->nullable()->change();
        $table->string('loc5_address_ja')->nullable()->change();
    });
}
};

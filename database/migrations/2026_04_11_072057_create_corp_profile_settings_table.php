<?php

// Run: php artisan make:migration create_corp_profile_settings_table
// Then paste this schema and run: php artisan migrate

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('corp_profile_settings', function (Blueprint $table) {
            $table->id();

            // ── OUR STRENGTHS TEXT ────────────────────────────
            $table->string('strengths_heading')->nullable();
            $table->string('strengths_heading_ja')->nullable();
            $table->text('strengths_para1')->nullable();
            $table->text('strengths_para1_ja')->nullable();
            $table->text('strengths_para2')->nullable();
            $table->text('strengths_para2_ja')->nullable();
            $table->string('strengths_cta')->nullable();
            $table->string('strengths_cta_ja')->nullable();

            // ── STAT BOXES (4) ────────────────────────────────
            $table->string('str_stat1_value')->nullable();
            $table->string('str_stat1_label')->nullable();
            $table->string('str_stat1_label_ja')->nullable();
            $table->string('str_stat1_sub')->nullable();
            $table->string('str_stat1_sub_ja')->nullable();

            $table->string('str_stat2_value')->nullable();
            $table->string('str_stat2_label')->nullable();
            $table->string('str_stat2_label_ja')->nullable();
            $table->string('str_stat2_sub')->nullable();
            $table->string('str_stat2_sub_ja')->nullable();

            $table->string('str_stat3_value')->nullable();
            $table->string('str_stat3_label')->nullable();
            $table->string('str_stat3_label_ja')->nullable();
            $table->string('str_stat3_sub')->nullable();
            $table->string('str_stat3_sub_ja')->nullable();

            $table->string('str_stat4_value')->nullable();
            $table->string('str_stat4_label')->nullable();
            $table->string('str_stat4_label_ja')->nullable();
            $table->string('str_stat4_sub')->nullable();
            $table->string('str_stat4_sub_ja')->nullable();

            // ── FEATURE CARDS (4) ─────────────────────────────
            $table->string('str_feat1_title')->nullable();
            $table->string('str_feat1_title_ja')->nullable();
            $table->string('str_feat1_sub')->nullable();
            $table->string('str_feat1_sub_ja')->nullable();
            $table->text('str_feat1_desc')->nullable();
            $table->text('str_feat1_desc_ja')->nullable();

            $table->string('str_feat2_title')->nullable();
            $table->string('str_feat2_title_ja')->nullable();
            $table->string('str_feat2_sub')->nullable();
            $table->string('str_feat2_sub_ja')->nullable();
            $table->text('str_feat2_desc')->nullable();
            $table->text('str_feat2_desc_ja')->nullable();

            $table->string('str_feat3_title')->nullable();
            $table->string('str_feat3_title_ja')->nullable();
            $table->string('str_feat3_sub')->nullable();
            $table->string('str_feat3_sub_ja')->nullable();
            $table->text('str_feat3_desc')->nullable();
            $table->text('str_feat3_desc_ja')->nullable();

            $table->string('str_feat4_title')->nullable();
            $table->string('str_feat4_title_ja')->nullable();
            $table->string('str_feat4_sub')->nullable();
            $table->string('str_feat4_sub_ja')->nullable();
            $table->text('str_feat4_desc')->nullable();
            $table->text('str_feat4_desc_ja')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('corp_profile_settings');
    }
};
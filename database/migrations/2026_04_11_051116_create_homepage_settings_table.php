<?php

// Run: php artisan make:migration create_homepage_settings_table
// Then paste this and run: php artisan migrate

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('homepage_settings', function (Blueprint $table) {
            $table->id();

            // ── HERO ──────────────────────────────────────────
            $table->string('hero_heading')->nullable();
            $table->string('hero_heading_ja')->nullable();
            $table->text('hero_subtext')->nullable();
            $table->text('hero_subtext_ja')->nullable();
            $table->string('hero_tagline')->nullable();
            $table->string('hero_tagline_ja')->nullable();
            $table->string('hero_image')->nullable(); // background image

            // ── CORPORATE INFO ────────────────────────────────
            $table->string('corp_heading')->nullable();
            $table->string('corp_heading_ja')->nullable();
            $table->text('corp_para1')->nullable();
            $table->text('corp_para1_ja')->nullable();
            $table->text('corp_para2')->nullable();
            $table->text('corp_para2_ja')->nullable();

            // Stats (4 boxes)
            $table->string('stat1_value')->nullable();
            $table->string('stat1_label')->nullable();
            $table->string('stat1_label_ja')->nullable();
            $table->string('stat1_sub')->nullable();
            $table->string('stat1_sub_ja')->nullable();

            $table->string('stat2_value')->nullable();
            $table->string('stat2_label')->nullable();
            $table->string('stat2_label_ja')->nullable();
            $table->string('stat2_sub')->nullable();
            $table->string('stat2_sub_ja')->nullable();

            $table->string('stat3_value')->nullable();
            $table->string('stat3_label')->nullable();
            $table->string('stat3_label_ja')->nullable();
            $table->string('stat3_sub')->nullable();
            $table->string('stat3_sub_ja')->nullable();

            $table->string('stat4_value')->nullable();
            $table->string('stat4_label')->nullable();
            $table->string('stat4_label_ja')->nullable();
            $table->string('stat4_sub')->nullable();
            $table->string('stat4_sub_ja')->nullable();

            // Feature cards (4 cards)
            $table->string('feat1_label')->nullable();
            $table->string('feat1_label_ja')->nullable();
            $table->string('feat1_sub')->nullable();
            $table->string('feat1_sub_ja')->nullable();

            $table->string('feat2_label')->nullable();
            $table->string('feat2_label_ja')->nullable();
            $table->string('feat2_sub')->nullable();
            $table->string('feat2_sub_ja')->nullable();

            $table->string('feat3_label')->nullable();
            $table->string('feat3_label_ja')->nullable();
            $table->string('feat3_sub')->nullable();
            $table->string('feat3_sub_ja')->nullable();

            $table->string('feat4_label')->nullable();
            $table->string('feat4_label_ja')->nullable();
            $table->string('feat4_sub')->nullable();
            $table->string('feat4_sub_ja')->nullable();

            // ── SECTION LABELS / INTROS ───────────────────────
            $table->text('services_intro')->nullable();
            $table->text('services_intro_ja')->nullable();

            $table->text('solutions_intro')->nullable();
            $table->text('solutions_intro_ja')->nullable();

            $table->text('updates_intro')->nullable();
            $table->text('updates_intro_ja')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('homepage_settings');
    }
};
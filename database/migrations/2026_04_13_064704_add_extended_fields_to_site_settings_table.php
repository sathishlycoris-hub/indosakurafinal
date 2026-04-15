<?php

// php artisan make:migration add_extended_fields_to_site_settings_table
// Paste this and run: php artisan migrate

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {

            // ── Footer column headings (solutions/services) ──
            $table->text('footer_solutions_heading_en')->nullable();
            $table->text('footer_solutions_heading_ja')->nullable();
            $table->text('footer_services_heading_en')->nullable();
            $table->text('footer_services_heading_ja')->nullable();

            // ── Footer — Company links ────────────────────────
            $table->text('fc1_en')->nullable(); $table->text('fc1_ja')->nullable(); $table->text('fc1_href')->nullable();
            $table->text('fc2_en')->nullable(); $table->text('fc2_ja')->nullable(); $table->text('fc2_href')->nullable();
            $table->text('fc3_en')->nullable(); $table->text('fc3_ja')->nullable(); $table->text('fc3_href')->nullable();
            $table->text('fc4_en')->nullable(); $table->text('fc4_ja')->nullable(); $table->text('fc4_href')->nullable();
            $table->text('fc5_en')->nullable(); $table->text('fc5_ja')->nullable(); $table->text('fc5_href')->nullable();

            // ── Footer — Resources links ──────────────────────
            $table->text('fr1_en')->nullable(); $table->text('fr1_ja')->nullable(); $table->text('fr1_href')->nullable();
            $table->text('fr2_en')->nullable(); $table->text('fr2_ja')->nullable(); $table->text('fr2_href')->nullable();
            $table->text('fr3_en')->nullable(); $table->text('fr3_ja')->nullable(); $table->text('fr3_href')->nullable();
            $table->text('fr4_en')->nullable(); $table->text('fr4_ja')->nullable(); $table->text('fr4_href')->nullable();

            // ── Social media ──────────────────────────────────
            $table->text('social_facebook')->nullable();
            $table->text('social_x')->nullable();
            $table->text('social_linkedin')->nullable();
            $table->text('social_youtube')->nullable();
            $table->text('social_instagram')->nullable();

            // ── Contact page sidebar ──────────────────────────
            $table->text('contact_phone')->nullable();
            $table->text('contact_email')->nullable();
            $table->text('contact_address')->nullable();
            $table->text('contact_address_ja')->nullable();
            $table->text('contact_tagline_en')->nullable();
            $table->text('contact_tagline_ja')->nullable();
            $table->text('contact_heading_en')->nullable();
            $table->text('contact_heading_ja')->nullable();
            $table->text('contact_subtext_en')->nullable();
            $table->text('contact_subtext_ja')->nullable();

            // ── Corporate sub-header tabs (9 tabs) ────────────
            $table->text('corp1_en')->nullable(); $table->text('corp1_ja')->nullable(); $table->text('corp1_href')->nullable();
            $table->text('corp2_en')->nullable(); $table->text('corp2_ja')->nullable(); $table->text('corp2_href')->nullable();
            $table->text('corp3_en')->nullable(); $table->text('corp3_ja')->nullable(); $table->text('corp3_href')->nullable();
            $table->text('corp4_en')->nullable(); $table->text('corp4_ja')->nullable(); $table->text('corp4_href')->nullable();
            $table->text('corp5_en')->nullable(); $table->text('corp5_ja')->nullable(); $table->text('corp5_href')->nullable();
            $table->text('corp6_en')->nullable(); $table->text('corp6_ja')->nullable(); $table->text('corp6_href')->nullable();
            $table->text('corp7_en')->nullable(); $table->text('corp7_ja')->nullable(); $table->text('corp7_href')->nullable();
            $table->text('corp8_en')->nullable(); $table->text('corp8_ja')->nullable(); $table->text('corp8_href')->nullable();
            $table->text('corp9_en')->nullable(); $table->text('corp9_ja')->nullable(); $table->text('corp9_href')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'footer_solutions_heading_en', 'footer_solutions_heading_ja',
                'footer_services_heading_en',  'footer_services_heading_ja',
                'fc1_en','fc1_ja','fc1_href','fc2_en','fc2_ja','fc2_href',
                'fc3_en','fc3_ja','fc3_href','fc4_en','fc4_ja','fc4_href','fc5_en','fc5_ja','fc5_href',
                'fr1_en','fr1_ja','fr1_href','fr2_en','fr2_ja','fr2_href',
                'fr3_en','fr3_ja','fr3_href','fr4_en','fr4_ja','fr4_href',
                'social_facebook','social_x','social_linkedin','social_youtube','social_instagram',
                'contact_phone','contact_email','contact_address','contact_address_ja',
                'contact_tagline_en','contact_tagline_ja',
                'contact_heading_en','contact_heading_ja',
                'contact_subtext_en','contact_subtext_ja',
                'corp1_en','corp1_ja','corp1_href','corp2_en','corp2_ja','corp2_href',
                'corp3_en','corp3_ja','corp3_href','corp4_en','corp4_ja','corp4_href',
                'corp5_en','corp5_ja','corp5_href','corp6_en','corp6_ja','corp6_href',
                'corp7_en','corp7_ja','corp7_href','corp8_en','corp8_ja','corp8_href',
                'corp9_en','corp9_ja','corp9_href',
            ]);
        });
    }
};
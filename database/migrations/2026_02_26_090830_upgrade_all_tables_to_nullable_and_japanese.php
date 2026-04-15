<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | BLOGS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE blogs MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE blogs MODIFY short_description TEXT NULL");
        DB::statement("ALTER TABLE blogs MODIFY content LONGTEXT NULL");
        DB::statement("ALTER TABLE blogs MODIFY category VARCHAR(255) NULL");
        DB::statement("ALTER TABLE blogs MODIFY published_date DATE NULL");

        
                

        /*
        |--------------------------------------------------------------------------
        | TEAMS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE teams MODIFY name VARCHAR(255) NULL");
        DB::statement("ALTER TABLE teams MODIFY designation VARCHAR(255) NULL");
        DB::statement("ALTER TABLE teams MODIFY category VARCHAR(255) NULL");
        DB::statement("ALTER TABLE teams MODIFY description TEXT NULL");

        DB::statement("ALTER TABLE teams ADD name_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE teams ADD designation_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE teams ADD description_ja TEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | FAQS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE faqs MODIFY question VARCHAR(255) NULL");
        DB::statement("ALTER TABLE faqs MODIFY answer TEXT NULL");

        DB::statement("ALTER TABLE faqs ADD question_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE faqs ADD answer_ja TEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | GREETINGS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE greetings MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE greetings MODIFY description TEXT NULL");

        DB::statement("ALTER TABLE greetings ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE greetings ADD description_ja TEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | PHILOSOPHIES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE philosophies MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE philosophies MODIFY content LONGTEXT NULL");
        DB::statement("ALTER TABLE philosophies MODIFY description LONGTEXT NULL");

        DB::statement("ALTER TABLE philosophies ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE philosophies ADD content_ja LONGTEXT NULL");
        DB::statement("ALTER TABLE philosophies ADD description_ja LONGTEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | PROFILES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE profiles MODIFY sub_title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE profiles MODIFY content LONGTEXT NULL");

        DB::statement("ALTER TABLE profiles ADD sub_title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE profiles ADD content_ja LONGTEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | HISTORIES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE histories MODIFY description LONGTEXT NULL");
        DB::statement("ALTER TABLE histories ADD description_ja LONGTEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | CLIENTS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE clients MODIFY description LONGTEXT NULL");
        DB::statement("ALTER TABLE clients ADD description_ja LONGTEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | POLICIES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE policies MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE policies MODIFY intro LONGTEXT NULL");

        DB::statement("ALTER TABLE policies ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE policies ADD intro_ja LONGTEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | POLICY SECTIONS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE policy_sections MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE policy_sections MODIFY description LONGTEXT NULL");

        DB::statement("ALTER TABLE policy_sections ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE policy_sections ADD description_ja LONGTEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | SERVICES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE services MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE services MODIFY hero_description TEXT NULL");
        DB::statement("ALTER TABLE services MODIFY how_it_works TEXT NULL");

        DB::statement("ALTER TABLE services ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE services ADD hero_description_ja TEXT NULL");
        DB::statement("ALTER TABLE services ADD how_it_works_ja TEXT NULL");

        /*
        |--------------------------------------------------------------------------
        | SEO
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE seos ADD meta_title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE seos ADD meta_description_ja TEXT NULL");
        DB::statement("ALTER TABLE seos ADD meta_keywords_ja TEXT NULL");
    }

    public function down(): void
    {
        // No rollback for safety
    }
};
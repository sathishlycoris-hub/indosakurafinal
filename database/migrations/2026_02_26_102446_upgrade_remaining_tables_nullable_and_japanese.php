<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {

        /*
        |--------------------------------------------------------------------------
        | NEWSEVENTS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE newsevents MODIFY date DATE NULL");
        DB::statement("ALTER TABLE newsevents MODIFY eventtype VARCHAR(255) NULL");
        DB::statement("ALTER TABLE newsevents MODIFY short VARCHAR(255) NULL");
        DB::statement("ALTER TABLE newsevents MODIFY description LONGTEXT NULL");

        DB::statement("ALTER TABLE newsevents ADD short_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE newsevents ADD description_ja LONGTEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | SEMINARS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE seminars MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE seminars MODIFY description TEXT NULL");
        DB::statement("ALTER TABLE seminars MODIFY location VARCHAR(255) NULL");
        DB::statement("ALTER TABLE seminars MODIFY date DATE NULL");
        DB::statement("ALTER TABLE seminars MODIFY time VARCHAR(255) NULL");


        /*
        |--------------------------------------------------------------------------
        | JOBS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE jobs MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs MODIFY slug VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs MODIFY department VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs MODIFY location VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs MODIFY employment_type VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs MODIFY experience VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs MODIFY about_role LONGTEXT NULL");

        DB::statement("ALTER TABLE jobs ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE jobs ADD short_description_ja LONGTEXT NULL");
        DB::statement("ALTER TABLE jobs ADD about_role_ja LONGTEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | JOB SECTIONS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE job_sections MODIFY content TEXT NULL");
        DB::statement("ALTER TABLE job_sections ADD content_ja TEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | CLIENT SECTIONS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE client_sections MODIFY name VARCHAR(255) NULL");
        DB::statement("ALTER TABLE client_sections ADD name_ja VARCHAR(255) NULL");


        /*
        |--------------------------------------------------------------------------
        | SOLUTIONS (SECOND STRUCTURE)
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE solutions MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solutions MODIFY slug VARCHAR(255) NULL");

        DB::statement("ALTER TABLE solutions ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solutions ADD subtitle_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solutions ADD hero_description_ja TEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | SOLUTION FEATURES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE solution_features MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solution_features MODIFY description TEXT NULL");

        DB::statement("ALTER TABLE solution_features ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solution_features ADD description_ja TEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | SOLUTION USE CASES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE solution_use_cases MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solution_use_cases MODIFY description TEXT NULL");

        DB::statement("ALTER TABLE solution_use_cases ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solution_use_cases ADD subtitle_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solution_use_cases ADD description_ja TEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | SOLUTION CASE STUDIES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE solution_case_studies MODIFY title VARCHAR(255) NULL");

        DB::statement("ALTER TABLE solution_case_studies ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solution_case_studies ADD client_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solution_case_studies ADD summary_ja TEXT NULL");
        DB::statement("ALTER TABLE solution_case_studies ADD result_ja VARCHAR(255) NULL");


        /*
        |--------------------------------------------------------------------------
        | SOLUTION INDUSTRIES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE solution_industries MODIFY title VARCHAR(255) NULL");

        DB::statement("ALTER TABLE solution_industries ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE solution_industries ADD description_ja TEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | SERVICE HIGHLIGHTS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE service_highlights MODIFY title VARCHAR(255) NULL");

        DB::statement("ALTER TABLE service_highlights ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE service_highlights ADD description_ja TEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | SERVICE BENEFITS
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE service_benefits MODIFY title VARCHAR(255) NULL");

        DB::statement("ALTER TABLE service_benefits ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE service_benefits ADD description_ja TEXT NULL");


        /*
        |--------------------------------------------------------------------------
        | SERVICE INDUSTRIES
        |--------------------------------------------------------------------------
        */
        DB::statement("ALTER TABLE service_industries MODIFY title VARCHAR(255) NULL");
        DB::statement("ALTER TABLE service_industries MODIFY description LONGTEXT NULL");

        DB::statement("ALTER TABLE service_industries ADD title_ja VARCHAR(255) NULL");
        DB::statement("ALTER TABLE service_industries ADD description_ja LONGTEXT NULL");

    }

    public function down(): void
    {
        // no rollback
    }
};
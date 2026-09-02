<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A Service doesn't own Case Studies (Solutions do — see
     * SolutionCaseStudy.solution_id). This pivot lets a Service page
     * "feature" existing SolutionCaseStudy rows without duplicating any
     * case-study content: it just links IDs. A case study can be featured
     * on any number of services; a service can feature any number of case
     * studies (independent of which Solution actually owns each one).
     */
    public function up(): void
    {
        if (Schema::hasTable('service_solution_case_study')) {
            return; // idempotent — safe if a prior partial run already created it
        }

        Schema::create('service_solution_case_study', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->foreignId('solution_case_study_id')->constrained('solution_case_studies')->cascadeOnDelete();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['service_id', 'solution_case_study_id'], 'svc_scs_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_solution_case_study');
    }
};

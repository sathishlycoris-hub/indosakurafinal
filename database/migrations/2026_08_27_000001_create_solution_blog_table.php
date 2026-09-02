<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A Solution doesn't own Blogs (Services do — see Blog.service_id).
     * This pivot lets a Solution page "feature" existing Blog rows without
     * duplicating any blog content: it just links IDs. A blog can be
     * featured on any number of solutions; a solution can feature any
     * number of blogs (independent of which Service actually owns each blog,
     * and independent of the existing Service->blogs() attachment).
     */
    public function up(): void
    {
        if (Schema::hasTable('solution_blog')) {
            return; // idempotent — safe if a prior partial run already created it
        }

        Schema::create('solution_blog', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solution_id')->constrained()->cascadeOnDelete();
            $table->foreignId('blog_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['solution_id', 'blog_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('solution_blog');
    }
};

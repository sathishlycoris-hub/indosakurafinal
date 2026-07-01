<?php

use App\Models\IndiaDesk;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('case_studies')) {
            return;
        }

        $legacyRows = DB::table('case_studies')->orderBy('id')->get();

        if ($legacyRows->isNotEmpty()) {
            $targetDesk = IndiaDesk::orderBy('id')->first();

            if (!$targetDesk) {
                // No India Desk exists yet — create a placeholder so data isn't lost.
                $targetDesk = IndiaDesk::create([
                    'title' => 'General',
                    'slug'  => 'general',
                    'cta_url' => '/contact',
                ]);
            }

            $existing = is_array($targetDesk->case_studies) ? $targetDesk->case_studies : [];
            $usedSlugs = array_filter(array_column($existing, 'slug'));

            foreach ($legacyRows as $row) {
                $base = $row->slug ?: Str::slug($row->title ?: 'case-study');
                $slug = $base;
                $n = 2;
                while (in_array($slug, $usedSlugs, true)) {
                    $slug = $base . '-' . $n++;
                }
                $usedSlugs[] = $slug;

                $existing[] = [
                    'slug'                     => $slug,
                    'title'                    => $row->title,
                    'title_ja'                 => $row->title_ja,
                    'logo'                     => null,
                    'hero_image'               => $row->hero_image,
                    'secondary_image'          => $row->secondary_image,
                    'tags'                     => $row->tags,
                    'tags_ja'                  => null,
                    'challenge_title'          => 'Subject',
                    'challenge_title_ja'       => '課題',
                    'challenge_description'    => $row->benefit,
                    'challenge_description_ja' => $row->benefit_ja,
                    'solution_title'           => 'Implementation Effect',
                    'solution_title_ja'        => '導入効果',
                    'solution_description'     => $row->implementation,
                    'solution_description_ja'  => $row->implementation_ja,
                    'results'                  => $row->content,
                    'results_ja'               => $row->content_ja,
                    'meta_title'               => $row->meta_title,
                    'meta_title_ja'            => $row->meta_title_ja,
                    'meta_description'         => $row->meta_description,
                    'meta_description_ja'      => $row->meta_description_ja,
                    'meta_keywords'            => $row->meta_keywords,
                    'meta_keywords_ja'         => $row->meta_keywords_ja,
                    'og_image'                 => $row->og_image,
                ];
            }

            $targetDesk->update(['case_studies' => $existing]);
        }

        Schema::dropIfExists('case_studies');
    }

    public function down(): void
    {
        // Irreversible: original standalone case_studies table/rows are gone.
        Schema::create('case_studies', function ($table) {
            $table->id();
            $table->timestamps();
        });
    }
};
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageSetting extends Model
{
    protected $fillable = [
        // Hero
        'hero_heading', 'hero_heading_ja',
        'hero_subtext', 'hero_subtext_ja',
        'hero_tagline', 'hero_tagline_ja',
        'hero_image',

        // Corporate
        'corp_heading', 'corp_heading_ja',
        'corp_para1',   'corp_para1_ja',
        'corp_para2',   'corp_para2_ja',

        // Stats
        'stat1_value', 'stat1_label', 'stat1_label_ja', 'stat1_sub', 'stat1_sub_ja',
        'stat2_value', 'stat2_label', 'stat2_label_ja', 'stat2_sub', 'stat2_sub_ja',
        'stat3_value', 'stat3_label', 'stat3_label_ja', 'stat3_sub', 'stat3_sub_ja',
        'stat4_value', 'stat4_label', 'stat4_label_ja', 'stat4_sub', 'stat4_sub_ja',

        // Feature cards
        'feat1_label', 'feat1_label_ja', 'feat1_sub', 'feat1_sub_ja',
        'feat2_label', 'feat2_label_ja', 'feat2_sub', 'feat2_sub_ja',
        'feat3_label', 'feat3_label_ja', 'feat3_sub', 'feat3_sub_ja',
        'feat4_label', 'feat4_label_ja', 'feat4_sub', 'feat4_sub_ja',

        // Section intros
        'services_intro',  'services_intro_ja',
        'solutions_intro', 'solutions_intro_ja',
        'updates_intro',   'updates_intro_ja',
    ];
}
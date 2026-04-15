<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CorpProfileSetting extends Model
{
    protected $fillable = [
        // Our Strengths text
        'strengths_heading', 'strengths_heading_ja',
        'strengths_para1',   'strengths_para1_ja',
        'strengths_para2',   'strengths_para2_ja',
        'strengths_cta',     'strengths_cta_ja',

        // Stat boxes
        'str_stat1_value', 'str_stat1_label', 'str_stat1_label_ja', 'str_stat1_sub', 'str_stat1_sub_ja',
        'str_stat2_value', 'str_stat2_label', 'str_stat2_label_ja', 'str_stat2_sub', 'str_stat2_sub_ja',
        'str_stat3_value', 'str_stat3_label', 'str_stat3_label_ja', 'str_stat3_sub', 'str_stat3_sub_ja',
        'str_stat4_value', 'str_stat4_label', 'str_stat4_label_ja', 'str_stat4_sub', 'str_stat4_sub_ja',

        // Feature cards
        'str_feat1_title', 'str_feat1_title_ja', 'str_feat1_sub', 'str_feat1_sub_ja', 'str_feat1_desc', 'str_feat1_desc_ja',
        'str_feat2_title', 'str_feat2_title_ja', 'str_feat2_sub', 'str_feat2_sub_ja', 'str_feat2_desc', 'str_feat2_desc_ja',
        'str_feat3_title', 'str_feat3_title_ja', 'str_feat3_sub', 'str_feat3_sub_ja', 'str_feat3_desc', 'str_feat3_desc_ja',
        'str_feat4_title', 'str_feat4_title_ja', 'str_feat4_sub', 'str_feat4_sub_ja', 'str_feat4_desc', 'str_feat4_desc_ja',

        // Locations (5 offices)
        'loc1_name', 'loc1_name_ja', 'loc1_address', 'loc1_address_ja',
        'loc2_name', 'loc2_name_ja', 'loc2_address', 'loc2_address_ja',
        'loc3_name', 'loc3_name_ja', 'loc3_address', 'loc3_address_ja',
        'loc4_name', 'loc4_name_ja', 'loc4_address', 'loc4_address_ja',
        'loc5_name', 'loc5_name_ja', 'loc5_address', 'loc5_address_ja',
    ];
}
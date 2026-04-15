<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomepageSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomepageController extends Controller
{
    /**
     * Load the single settings row (create with defaults if not exists).
     */
    private function getSettings(): HomepageSetting
    {
        return HomepageSetting::firstOrCreate([], [
            // Hero defaults
            'hero_heading'    => '20 Years of Legacy Delivering',
            'hero_heading_ja' => '20年の実績と信頼',
            'hero_subtext'    => 'Since 2005, Indo-Sakura has been at the forefront of IT innovation, delivering cutting-edge solutions that empower businesses worldwide.',
            'hero_subtext_ja' => '2005年の創業以来、インドサクラはIT革新の最前線で、世界中の企業に最先端のソリューションを提供してきました。',
            'hero_tagline'    => 'Japanese Quality ✦ Indian Capability ✦ Global Innovation',
            'hero_tagline_ja' => '日本品質 ✦ インドの技術力 ✦ グローバルイノベーション',

            // Corporate defaults
            'corp_heading'    => 'Delivering Excellence Across Continents',
            'corp_heading_ja' => '世界をつなぐ卓越したITサービス',
            'corp_para1'      => 'With two decades of experience spanning Japan, India, and the USA, Indo-Sakura has established itself as a trusted partner for businesses seeking innovative IT solutions.',
            'corp_para1_ja'   => '日本・インド・アメリカにまたがる20年以上の実績を持つインドサクラは、革新的なITソリューションを求める企業にとって信頼できるパートナーとして成長してきました。',
            'corp_para2'      => 'We serve 55 customers worldwide with a dedicated team of over 150 IT experts, focusing on five key industry sectors.',
            'corp_para2_ja'   => '専門性の高いITエキスパートチームとともに、世界中のお客様へサービスを提供しています。',

            // Stats defaults
            'stat1_value' => '20',   'stat1_label' => 'Years of Excellence', 'stat1_label_ja' => '20年の実績', 'stat1_sub' => 'Japan, India, USA',   'stat1_sub_ja' => '日本・インド・アメリカ',
            'stat2_value' => '155',  'stat2_label' => 'Customers',           'stat2_label_ja' => '取引企業数', 'stat2_sub' => 'Worldwide',             'stat2_sub_ja' => '世界各国',
            'stat3_value' => '130',  'stat3_label' => 'IT Experts',          'stat3_label_ja' => 'ITエキスパート', 'stat3_sub' => 'Dedicated Team',    'stat3_sub_ja' => '専門チーム',
            'stat4_value' => '8',    'stat4_label' => 'Target Industry',     'stat4_label_ja' => '主要業界',   'stat4_sub' => 'Key Sectors',          'stat4_sub_ja' => '重点分野',

            // Feature cards defaults
            'feat1_label' => 'Global Reach',    'feat1_label_ja' => 'グローバル展開',   'feat1_sub' => 'Operations in 3 continents',      'feat1_sub_ja' => '3大陸で事業展開',
            'feat2_label' => 'Expert Team',     'feat2_label_ja' => '専門チーム',       'feat2_sub' => '150+ certified professionals',    'feat2_sub_ja' => '150名以上の専門家',
            'feat3_label' => 'Quality Focus',   'feat3_label_ja' => '品質重視',         'feat3_sub' => 'ISO certified processes',         'feat3_sub_ja' => 'ISO認証プロセス',
            'feat4_label' => 'Growth Partner',  'feat4_label_ja' => '成長パートナー',   'feat4_sub' => 'Long-term client relationships',  'feat4_sub_ja' => '長期的なパートナーシップ',

            // Section intros
            'services_intro'    => 'Comprehensive IT solutions with cutting-edge technology expertise...',
            'services_intro_ja' => '最先端技術を活用した包括的なITソリューションを提供します。',
            'solutions_intro'   => 'Cutting-edge solutions to solve your business challenges and drive digital transformation',
            'solutions_intro_ja'=> 'ビジネス課題を解決し、デジタルトランスフォーメーションを推進する最先端ソリューション',
            'updates_intro'     => 'Stay updated with our latest news, announcements, and industry insights.',
            'updates_intro_ja'  => '最新ニュースやお知らせ、業界情報をご確認ください。',
        ]);
    }

    public function index()
    {
        return Inertia::render('Admin/Homepage/Index', [
            'settings' => $this->getSettings(),
        ]);
    }

    public function update(Request $request)
    {
        $settings = $this->getSettings();

        $data = $request->validate([
            'hero_heading'    => 'nullable|string',
            'hero_heading_ja' => 'nullable|string',
            'hero_subtext'    => 'nullable|string',
            'hero_subtext_ja' => 'nullable|string',
            'hero_tagline'    => 'nullable|string',
            'hero_tagline_ja' => 'nullable|string',
            'hero_image'      => 'nullable|image|max:4096',

            'corp_heading'    => 'nullable|string',
            'corp_heading_ja' => 'nullable|string',
            'corp_para1'      => 'nullable|string',
            'corp_para1_ja'   => 'nullable|string',
            'corp_para2'      => 'nullable|string',
            'corp_para2_ja'   => 'nullable|string',

            'stat1_value' => 'nullable|string', 'stat1_label' => 'nullable|string', 'stat1_label_ja' => 'nullable|string', 'stat1_sub' => 'nullable|string', 'stat1_sub_ja' => 'nullable|string',
            'stat2_value' => 'nullable|string', 'stat2_label' => 'nullable|string', 'stat2_label_ja' => 'nullable|string', 'stat2_sub' => 'nullable|string', 'stat2_sub_ja' => 'nullable|string',
            'stat3_value' => 'nullable|string', 'stat3_label' => 'nullable|string', 'stat3_label_ja' => 'nullable|string', 'stat3_sub' => 'nullable|string', 'stat3_sub_ja' => 'nullable|string',
            'stat4_value' => 'nullable|string', 'stat4_label' => 'nullable|string', 'stat4_label_ja' => 'nullable|string', 'stat4_sub' => 'nullable|string', 'stat4_sub_ja' => 'nullable|string',

            'feat1_label' => 'nullable|string', 'feat1_label_ja' => 'nullable|string', 'feat1_sub' => 'nullable|string', 'feat1_sub_ja' => 'nullable|string',
            'feat2_label' => 'nullable|string', 'feat2_label_ja' => 'nullable|string', 'feat2_sub' => 'nullable|string', 'feat2_sub_ja' => 'nullable|string',
            'feat3_label' => 'nullable|string', 'feat3_label_ja' => 'nullable|string', 'feat3_sub' => 'nullable|string', 'feat3_sub_ja' => 'nullable|string',
            'feat4_label' => 'nullable|string', 'feat4_label_ja' => 'nullable|string', 'feat4_sub' => 'nullable|string', 'feat4_sub_ja' => 'nullable|string',

            'services_intro'     => 'nullable|string',
            'services_intro_ja'  => 'nullable|string',
            'solutions_intro'    => 'nullable|string',
            'solutions_intro_ja' => 'nullable|string',
            'updates_intro'      => 'nullable|string',
            'updates_intro_ja'   => 'nullable|string',
        ]);

        // Handle hero image upload
        if ($request->hasFile('hero_image')) {
            if ($settings->hero_image) {
                Storage::disk('public')->delete($settings->hero_image);
            }
            $data['hero_image'] = $request->file('hero_image')->store('homepage', 'public');
        } else {
            unset($data['hero_image']);
        }

        $settings->update($data);

        return back()->with('success', 'Homepage settings saved successfully');
    }
}
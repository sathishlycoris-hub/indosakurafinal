<?php



namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CorpProfileSetting;
use App\Models\Profile;
use App\Models\Seo;
use App\Models\Whitepaper;
use Inertia\Inertia;

class ProfilePageController extends Controller
{
    public function index()
    {
        $whitepaper = Whitepaper::first();

        return Inertia::render('Corporate/Profile', [
            // Existing company profile table rows (unchanged)
            'companyProfiles' => Profile::orderBy('sort_order')->get(),

            // NEW: Our Strengths CMS settings (auto-created with defaults if not exists)
            'corpSettings' => CorpProfileSetting::firstOrCreate([]),
            'seo' => Seo::where('page', 'corporate-profile')->first(),

            // NEW: Whitepaper gate — deliberately excludes the actual file path.
            // The real download URL is only ever returned via the flash message
            // after a lead successfully submits the popup form.
            'whitepaper' => $whitepaper && $whitepaper->file ? [
                'title' => $whitepaper->title,
                'title_ja' => $whitepaper->title_ja,
                'description' => $whitepaper->description,
                'description_ja' => $whitepaper->description_ja,
            ] : null,
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Whitepaper;
use App\Models\WhitepaperLead;
use Illuminate\Http\Request;

class WhitepaperController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $whitepaper = Whitepaper::first();

        if (!$whitepaper || !$whitepaper->file) {
            return back()->with('error', 'The whitepaper is not available right now.');
        }

        WhitepaperLead::create([
            'whitepaper_id' => $whitepaper->id,
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        return back()->with([
            'success' => 'Thank you! Your download is ready.',
            'whitepaper_url' => asset('storage/' . $whitepaper->file),
        ]);
    }
}

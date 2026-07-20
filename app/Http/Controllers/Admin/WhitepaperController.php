<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Whitepaper;
use App\Models\WhitepaperLead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WhitepaperController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Whitepaper/Index', [
            'whitepaper' => Whitepaper::firstOrCreate([]),
            'leads' => WhitepaperLead::latest()
                ->when($request->filled('search'), function ($q) use ($request) {
                    $search = $request->search;
                    $q->where(function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%")
                           ->orWhere('email', 'like', "%{$search}%");
                    });
                })
                ->paginate(10)
                ->appends($request->only('search')),
            'filters' => $request->only('search'),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'description_ja' => 'nullable|string|max:1000',
            'file' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        $whitepaper = Whitepaper::firstOrCreate([]);

        if ($request->hasFile('file')) {
            if ($whitepaper->file && Storage::disk('public')->exists($whitepaper->file)) {
                Storage::disk('public')->delete($whitepaper->file);
            }
            $data['file'] = $request->file('file')->store('whitepapers', 'public');
        } else {
            unset($data['file']);
        }

        $whitepaper->update($data);

        return back()->with('success', 'Whitepaper settings saved.');
    }

    public function destroyLead(WhitepaperLead $lead)
    {
        $lead->delete();

        return back()->with('success', 'Lead deleted.');
    }
}
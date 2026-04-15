<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EventType;
use App\Models\Newsevent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewseventController extends Controller
{
    /**
     * Admin list page — passes both events and DB-driven event types
     */
    public function index()
    {
        return Inertia::render('Admin/Newevent/Index', [
            'events'     => Newsevent::orderBy('date', 'desc')->get(),
            'eventTypes' => EventType::where('name', '!=', 'All')
                                     ->orderBy('sort_order')
                                     ->get(),
        ]);
    }

    /**
     * Store new news/event
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'date'           => 'nullable|date',
            'eventtype'      => 'nullable|string',
            'eventtype_ja'   => 'nullable|string',
            'short'          => 'nullable|string',
            'short_ja'       => 'nullable|string',
            'description'    => 'nullable|string',
            'description_ja' => 'nullable|string',
            'image'          => 'nullable|image',
            'pdf'            => 'nullable|file|mimes:pdf',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('news', 'public');
        }
        if ($request->hasFile('pdf')) {
            $data['pdf'] = $request->file('pdf')->store('news', 'public');
        }

        Newsevent::create($data);

        return back()->with('success', 'News added');
    }

    /**
     * Public news detail page
     */
    public function show(Newsevent $newsevent)
    {
        return Inertia::render('News/Detail', [
            'news' => $newsevent,
        ]);
    }

    /**
     * Update news/event
     */
    public function update(Request $request, Newsevent $newsevent)
    {
        $data = $request->validate([
            'date'           => 'nullable|date',
            'eventtype'      => 'nullable|string',
            'eventtype_ja'   => 'nullable|string',
            'short'          => 'nullable|string',
            'short_ja'       => 'nullable|string',
            'description'    => 'nullable|string',
            'description_ja' => 'nullable|string',
            'image'          => 'nullable|image',
            'pdf'            => 'nullable|file|mimes:pdf',
        ]);

        if (!$request->hasFile('image')) {
            unset($data['image']);
        } else {
            if ($newsevent->image) Storage::disk('public')->delete($newsevent->image);
            $data['image'] = $request->file('image')->store('news', 'public');
        }

        if (!$request->hasFile('pdf')) {
            unset($data['pdf']);
        } else {
            if ($newsevent->pdf) Storage::disk('public')->delete($newsevent->pdf);
            $data['pdf'] = $request->file('pdf')->store('news', 'public');
        }

        $newsevent->update($data);

        return back()->with('success', 'News updated');
    }

    /**
     * Delete news/event
     */
    public function destroy(Newsevent $newsevent)
    {
        if ($newsevent->image) Storage::disk('public')->delete($newsevent->image);
        if ($newsevent->pdf)   Storage::disk('public')->delete($newsevent->pdf);

        $newsevent->delete();

        return back()->with('success', 'News deleted');
    }

    /**
     * Public Press Release page — passes DB-driven filters with JA names
     */
    public function pressRelease()
    {
        // Load all event types from DB (including "All")
        $types = EventType::orderBy('sort_order')->get();

        return Inertia::render('Corporate/Pressrelease', [
            'news'    => Newsevent::orderBy('date', 'desc')->get(),

            // EN filter labels (used as the stored value for matching)
            'filters' => $types->pluck('name')->toArray(),

            // JA filter labels (parallel array, same index)
            'filters_ja' => $types->pluck('name_ja')->toArray(),
        ]);
    }
}
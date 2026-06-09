<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Seminar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SeminarController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Seminar/Index', [
            'seminars' => Seminar::select(
                'id',
                'title', 'title_ja',
                'description', 'description_ja',
                'location', 'location_ja',
                'organizer', 'organizer_ja',
                'participation_fee', 'participation_fee_ja',
                'sponsorship', 'sponsorship_ja',
                'cooperation', 'cooperation_ja',
                'date', 'time', 'status', 'tags', 'image',
                // SEO
                'meta_title', 'meta_title_ja',
                'meta_description', 'meta_description_ja',
                'meta_keywords', 'meta_keywords_ja',
                'og_image'
            )->orderBy('date', 'desc')->get(),
        ]);
    }

    public function create() {}

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'                => 'nullable|string',
            'description'          => 'nullable|string',
            'location'             => 'nullable|string',
            'date'                 => 'nullable|date',
            'time'                 => 'nullable|string',
            'status'               => 'nullable|in:upcoming,archived',
            'title_ja'             => 'nullable|string',
            'description_ja'       => 'nullable|string',
            'location_ja'          => 'nullable|string',
            'participation_fee'    => 'nullable|string',
            'participation_fee_ja' => 'nullable|string',
            'organizer'            => 'nullable|string',
            'organizer_ja'         => 'nullable|string',
            'sponsorship'          => 'nullable|string',
            'sponsorship_ja'       => 'nullable|string',
            'cooperation'          => 'nullable|string',
            'cooperation_ja'       => 'nullable|string',
            'tags'                 => 'nullable|string',
            'image'                => 'nullable|image|max:4096',
            // SEO
            'meta_title'           => 'nullable|string|max:255',
            'meta_title_ja'        => 'nullable|string|max:255',
            'meta_description'     => 'nullable|string|max:500',
            'meta_description_ja'  => 'nullable|string|max:500',
            'meta_keywords'        => 'nullable|string|max:255',
            'meta_keywords_ja'     => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|max:4096',
        ]);

        if ($request->tags) {
            $data['tags'] = array_map('trim', explode(',', $request->tags));
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('seminars', 'public');
        }
        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('seminars/og', 'public');
        }

        Seminar::create($data);

        return back()->with('success', 'Seminar added successfully');
    }

    public function show(Seminar $seminar) {}

    public function edit(Seminar $seminar) {}

    public function update(Request $request, Seminar $seminar)
    {
        $data = $request->validate([
            'title'                => 'nullable|string',
            'description'          => 'nullable|string',
            'location'             => 'nullable|string',
            'date'                 => 'nullable|date',
            'time'                 => 'nullable|string',
            'status'               => 'nullable|in:upcoming,archived',
            'title_ja'             => 'nullable|string',
            'description_ja'       => 'nullable|string',
            'location_ja'          => 'nullable|string',
            'participation_fee'    => 'nullable|string',
            'participation_fee_ja' => 'nullable|string',
            'organizer'            => 'nullable|string',
            'organizer_ja'         => 'nullable|string',
            'sponsorship'          => 'nullable|string',
            'sponsorship_ja'       => 'nullable|string',
            'cooperation'          => 'nullable|string',
            'cooperation_ja'       => 'nullable|string',
            'tags'                 => 'nullable|string',
            'image'                => 'nullable|image|max:4096',
            // SEO
            'meta_title'           => 'nullable|string|max:255',
            'meta_title_ja'        => 'nullable|string|max:255',
            'meta_description'     => 'nullable|string|max:500',
            'meta_description_ja'  => 'nullable|string|max:500',
            'meta_keywords'        => 'nullable|string|max:255',
            'meta_keywords_ja'     => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|max:4096',
        ]);

        if ($request->filled('tags')) {
            $data['tags'] = array_map('trim', explode(',', $request->tags));
        } else {
            $data['tags'] = [];
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('seminars', 'public');
        } else {
            unset($data['image']);
        }

        if ($request->hasFile('og_image')) {
            if ($seminar->og_image) Storage::disk('public')->delete($seminar->og_image);
            $data['og_image'] = $request->file('og_image')->store('seminars/og', 'public');
        } else {
            unset($data['og_image']);
        }

        $seminar->update($data);

        return back()->with('success', 'Seminar updated successfully');
    }

    public function destroy(Seminar $seminar)
    {
        $seminar->delete();
        return back()->with('success', 'Seminar deleted');
    }
}
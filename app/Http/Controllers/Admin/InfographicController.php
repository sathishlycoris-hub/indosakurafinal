<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Infographic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InfographicController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Infographics/Index', [
            'infographics' => Infographic::orderBy('published_date', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'                  => 'nullable|string',
            'title_ja'               => 'nullable|string',
            'slug'                   => 'required|string|unique:infographics,slug',
            'short_description'      => 'nullable|string',
            'short_description_ja'   => 'nullable|string',
            'content'                => 'nullable|string',
            'content_ja'             => 'nullable|string',
            'table_of_contents'      => 'nullable|string',
            'table_of_contents_ja'   => 'nullable|string',
            'category'               => 'nullable|string',
            'category_ja'            => 'nullable|string',
            'author'                 => 'nullable|string',
            'author_ja'              => 'nullable|string',
            'published_date'         => 'nullable|date',
            'status'                 => 'nullable|in:published,draft',
            'image'                  => 'nullable|image',
            'infographic_image'      => 'nullable|image',
            // SEO
            'meta_title'             => 'nullable|string|max:255',
            'meta_title_ja'          => 'nullable|string|max:255',
            'meta_description'       => 'nullable|string|max:500',
            'meta_description_ja'    => 'nullable|string|max:500',
            'meta_keywords'          => 'nullable|string|max:255',
            'meta_keywords_ja'       => 'nullable|string|max:255',
            'og_image'               => 'nullable|image|max:4096',
        ]);

        if (!empty($data['table_of_contents'])) {
            $data['table_of_contents'] = json_decode($data['table_of_contents'], true);
        }
        if (!empty($data['table_of_contents_ja'])) {
            $data['table_of_contents_ja'] = json_decode($data['table_of_contents_ja'], true);
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('infographics', 'public');
        }
        if ($request->hasFile('infographic_image')) {
            $data['infographic_image'] = $request->file('infographic_image')
                ->store('infographics', 'public');
        }
        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('infographics/og', 'public');
        }

        Infographic::create($data);

        return back()->with('success', 'Infographic created successfully');
    }

    public function update(Request $request, Infographic $infographic)
    {
        $data = $request->validate([
            'title'                  => 'nullable|string',
            'title_ja'               => 'nullable|string',
            'slug'                   => 'required|string|unique:infographics,slug,' . $infographic->id,
            'short_description'      => 'nullable|string',
            'short_description_ja'   => 'nullable|string',
            'content'                => 'nullable|string',
            'content_ja'             => 'nullable|string',
            'table_of_contents'      => 'nullable|string',
            'table_of_contents_ja'   => 'nullable|string',
            'category'               => 'nullable|string',
            'category_ja'            => 'nullable|string',
            'author'                 => 'nullable|string',
            'author_ja'              => 'nullable|string',
            'published_date'         => 'nullable|date',
            'status'                 => 'nullable|in:published,draft',
            'image'                  => 'nullable|image',
            'infographic_image'      => 'nullable|image',
            // SEO
            'meta_title'             => 'nullable|string|max:255',
            'meta_title_ja'          => 'nullable|string|max:255',
            'meta_description'       => 'nullable|string|max:500',
            'meta_description_ja'    => 'nullable|string|max:500',
            'meta_keywords'          => 'nullable|string|max:255',
            'meta_keywords_ja'       => 'nullable|string|max:255',
        ]);

        if (!empty($data['table_of_contents'])) {
            $data['table_of_contents'] = json_decode($data['table_of_contents'], true);
        }
        if (!empty($data['table_of_contents_ja'])) {
            $data['table_of_contents_ja'] = json_decode($data['table_of_contents_ja'], true);
        }

        if ($request->hasFile('image')) {
            if ($infographic->image) Storage::disk('public')->delete($infographic->image);
            $data['image'] = $request->file('image')->store('infographics', 'public');
        } else {
            unset($data['image']);
        }

        if ($request->hasFile('infographic_image')) {
            if ($infographic->infographic_image) {
                Storage::disk('public')->delete($infographic->infographic_image);
            }
            $data['infographic_image'] = $request->file('infographic_image')
                ->store('infographics', 'public');
        } else {
            unset($data['infographic_image']);
        }

        if ($request->hasFile('og_image')) {
            if ($infographic->og_image) Storage::disk('public')->delete($infographic->og_image);
            $data['og_image'] = $request->file('og_image')->store('infographics/og', 'public');
        } else {
            unset($data['og_image']);
        }

        $infographic->update($data);

        return back()->with('success', 'Infographic updated successfully');
    }

    public function destroy(Infographic $infographic)
    {
        if ($infographic->image) Storage::disk('public')->delete($infographic->image);
        if ($infographic->infographic_image) {
            Storage::disk('public')->delete($infographic->infographic_image);
        }
        if ($infographic->og_image) Storage::disk('public')->delete($infographic->og_image);

        $infographic->delete();

        return back()->with('success', 'Infographic deleted successfully');
    }
}
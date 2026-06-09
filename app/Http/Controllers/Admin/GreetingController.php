<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Greeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GreetingController extends Controller
{
    /**
     * List greetings (Table + Sheet)
     */
    public function index()
    {
        return Inertia::render('Admin/Greetings/Index', [
            'greetings' => Greeting::latest()->get(),
        ]);
    }

    /**
     * Store new greeting (Sheet - Add)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'nullable|string|max:255',
            'title_ja'        => 'nullable|string|max:255',
            'image'       => 'nullable|image|max:4096',
            'description_ja'  => 'nullable|string',
            'description' => 'nullable|string',
            // SEO
            'meta_title'           => 'nullable|string|max:255',
            'meta_title_ja'        => 'nullable|string|max:255',
            'meta_description'     => 'nullable|string|max:500',
            'meta_description_ja'  => 'nullable|string|max:500',
            'meta_keywords'        => 'nullable|string|max:255',
            'meta_keywords_ja'     => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('greetings', 'public');
        }

        if ($request->hasFile('og_image')) {
            $data['og_image'] = $request->file('og_image')->store('greetings/og', 'public');
        }

        Greeting::create($data);

        return redirect()
            ->route('admin.greetings.index')
            ->with('success', 'Greeting added successfully');
    }

    /**
     * Update greeting (Sheet - Edit)
     */
    public function update(Request $request, Greeting $greeting)
    {
        $data = $request->validate([
            'title' => 'nullable|string|max:255',
            'title_ja' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_ja' => 'nullable|string',
            'image' => 'nullable|image|max:4096',

            // SEO
            'meta_title'           => 'nullable|string|max:255',
            'meta_title_ja'        => 'nullable|string|max:255',
            'meta_description'     => 'nullable|string|max:500',
            'meta_description_ja'  => 'nullable|string|max:500',
            'meta_keywords'        => 'nullable|string|max:255',
            'meta_keywords_ja'     => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|max:4096',
        ]);

        // If new image uploaded
        if ($request->hasFile('image')) {

            // Delete old image
            if ($greeting->image) {
                Storage::disk('public')->delete($greeting->image);
            }

            $data['image'] = $request->file('image')->store('greetings', 'public');
        } else {
            // VERY IMPORTANT: remove image from update data
            unset($data['image']);
        }
         if ($request->hasFile('og_image')) {
            if ($greeting->og_image) Storage::disk('public')->delete($greeting->og_image);
            $data['og_image'] = $request->file('og_image')->store('greetings/og', 'public');
        } else {
            unset($data['og_image']);
        }

        $greeting->update($data);

        return redirect()
            ->route('admin.greetings.index')
            ->with('success', 'Greeting updated successfully');
    }

    /**
     * Delete greeting
     */
    public function destroy(Greeting $greeting)
    {
        if ($greeting->image) {
            Storage::disk('public')->delete($greeting->image);
        }
        if ($greeting->og_image) Storage::disk('public')->delete($greeting->og_image);

        $greeting->delete();

        return back()->with('success', 'Greeting deleted successfully');
    }
}

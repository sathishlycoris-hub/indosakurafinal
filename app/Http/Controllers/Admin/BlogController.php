<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Blog/Index', [
            'blogs' => Blog::orderBy('published_date', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $request->validate([

            'title' => 'nullable|string',
            'title_ja' => 'nullable|string',
            'short_description' => 'nullable|string',
            'short_description_ja' => 'nullable|string',
            'content' => 'nullable',
            'content_ja' => 'nullable',
            'category' => 'nullable|string',
            'category_ja' => 'nullable|string',

            'author' => 'nullable|string',
            'author_ja' => 'nullable|string',
            'published_date' => 'nullable|date',
            'status' => 'nullable|in:published,draft',
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('blogs', 'public');
        }

        Blog::create($data);

        return back()->with('success', 'Blog created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        //
        $data = $request->validate([
            'language' => 'nullable|in:en,ja',
            'title' => 'nullable|string',
            'title_ja' => 'nullable|string',
            'short_description' => 'nullable|string',
            'short_description_ja' => 'nullable|string',
            'content' => 'nullable',
            'content_ja' => 'nullable',
            'category' => 'nullable|string',
            'category_ja' => 'nullable|string',
            'author' => 'nullable|string',
            'author_ja' => 'nullable|string',
            'published_date' => 'nullable|date',
            'status' => 'nullable|in:published,draft',
            'image' => 'nullable|image',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('blogs', 'public');
        } else {
            unset($data['image']); // THIS LINE IS KEY
        }

        // if ($request->hasFile('image')) {
        //     $data['image'] = $request->file('image')->store('blogs', 'public');
        // }

        $blog->update($data);

        return back()->with('success', 'Blog updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
        $blog->delete();
        return back()->with('success', 'Blog deleted successfully');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Blog/Index', [
            'blogs' => Blog::with('pageFaqs')->orderBy('published_date', 'desc')->get(),
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
        $decoded = $this->validated($request);

        return DB::transaction(function () use ($request, $decoded) {
            $data = $request->except('page_faqs');

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('blogs', 'public');
            }

            $blog = Blog::create($data);

            // Save relationship records out of the decoded array loop
            foreach ($decoded['page_faqs'] as $i => $item) {
                $blog->pageFaqs()->create([
                    'question'    => $item['question'] ?? '',
                    'question_ja' => $item['question_ja'] ?? null,
                    'answer'      => $item['answer'] ?? '',
                    'answer_ja'   => $item['answer_ja'] ?? null,
                    'sort_order'  => $i,
                ]);
            }

            return back()->with('success', 'Blog created successfully');
        });
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
        $decoded = $this->validated($request, $blog->id);

        return DB::transaction(function () use ($request, $blog, $decoded) {
            $data = $request->except('page_faqs');

            if ($request->hasFile('image')) {
                if ($blog->image) {
                    Storage::disk('public')->delete($blog->image);
                }
                $data['image'] = $request->file('image')->store('blogs', 'public');
            } else {
                unset($data['image']);
            }

            $blog->update($data);

            // Sync relation data by wiping old FAQs and recreating them fresh
            $blog->pageFaqs()->delete();
            foreach ($decoded['page_faqs'] as $i => $item) {
                $blog->pageFaqs()->create([
                    'question'    => $item['question'] ?? '',
                    'question_ja' => $item['question_ja'] ?? null,
                    'answer'      => $item['answer'] ?? '',
                    'answer_ja'   => $item['answer_ja'] ?? null,
                    'sort_order'  => $i,
                ]);
            }

            return back()->with('success', 'Blog updated successfully');
        });
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

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        $slugRule = $ignoreId
            ? 'required|string|unique:blogs,slug,' . $ignoreId
            : 'required|string|unique:blogs,slug';

        // 1. Keep 'page_faqs' unvalidated or nullable without the array type
        $request->validate([
            'title'                => 'nullable|string',
            'title_ja'             => 'nullable|string',
            'slug'                 => $slugRule,
            'short_description'    => 'nullable|string',
            'short_description_ja' => 'nullable|string',
            'content'              => 'nullable',
            'content_ja'           => 'nullable',
            'category'             => 'nullable|string',
            'category_ja'          => 'nullable|string',
            'author'               => 'nullable|string',
            'author_ja'            => 'nullable|string',
            'published_date'       => 'nullable|date',
            'status'               => 'nullable|in:published,draft',
            'image'                => 'nullable|image',
            'page_faqs'            => 'nullable', // Left open for JSON string data
        ]);

        // 2. Decode the incoming JSON string into a PHP array
        return [
            'page_faqs' => $request->filled('page_faqs')
                ? json_decode($request->input('page_faqs'), true)
                : []
        ];
    }
}

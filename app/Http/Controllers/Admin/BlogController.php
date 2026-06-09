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
    public function index()
    {
        return Inertia::render('Admin/Blog/Index', [
            'blogs' => Blog::with('pageFaqs')->orderBy('published_date', 'desc')->get(),
        ]);
    }

    public function create() {}

    public function store(Request $request)
    {
        $decoded = $this->validated($request);

        return DB::transaction(function () use ($request, $decoded) {
            $data = $request->except('page_faqs');

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('blogs', 'public');
            }

            if ($request->hasFile('og_image')) {
                $data['og_image'] = $request->file('og_image')->store('blogs/og', 'public');
            }

            $blog = Blog::create($data);

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

    public function show(Blog $blog) {}

    public function edit(Blog $blog) {}

    public function update(Request $request, Blog $blog)
    {
        $decoded = $this->validated($request, $blog->id);

        return DB::transaction(function () use ($request, $blog, $decoded) {
            $data = $request->except('page_faqs');

            if ($request->hasFile('image')) {
                if ($blog->image) Storage::disk('public')->delete($blog->image);
                $data['image'] = $request->file('image')->store('blogs', 'public');
            } else {
                unset($data['image']);
            }

            if ($request->hasFile('og_image')) {
                if ($blog->og_image) Storage::disk('public')->delete($blog->og_image);
                $data['og_image'] = $request->file('og_image')->store('blogs/og', 'public');
            } else {
                unset($data['og_image']);
            }

            $blog->update($data);

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

    public function destroy(Blog $blog)
    {
        $blog->delete();
        return back()->with('success', 'Blog deleted successfully');
    }

    private function validated(Request $request, ?int $ignoreId = null): array
    {
        $slugRule = $ignoreId
            ? 'required|string|unique:blogs,slug,' . $ignoreId
            : 'required|string|unique:blogs,slug';

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
            'page_faqs'            => 'nullable',
            // SEO
            'meta_title'           => 'nullable|string|max:255',
            'meta_title_ja'        => 'nullable|string|max:255',
            'meta_description'     => 'nullable|string|max:500',
            'meta_description_ja'  => 'nullable|string|max:500',
            'meta_keywords'        => 'nullable|string|max:255',
            'meta_keywords_ja'     => 'nullable|string|max:255',
            'og_image'             => 'nullable|image|max:4096',
        ]);

        return [
            'page_faqs' => $request->filled('page_faqs')
                ? json_decode($request->input('page_faqs'), true)
                : [],
        ];
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use App\Models\BlogPageFaq;
use App\Models\Seo;
use App\Models\BlogPage;
class BlogPageController extends Controller
{
    public function index()
    {
        return Inertia::render('Blogs', [
            'blogs' => Blog::where('status', 'published')
                ->orderBy('published_date', 'desc')
                ->get(),
            'seo' => Seo::where('page', 'blogs')->first(),
            'pageData' => BlogPage::first(),
        ]);
    }

    public function show(string $slug)
    {
        $blog = Blog::with('pageFaqs')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $faqs = $blog->pageFaqs->isNotEmpty()
            ? $blog->pageFaqs
            : BlogPageFaq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
                ->orderBy('id')
                ->get();

        $lang = app()->getLocale();

        return Inertia::render('Blogs/BlogDetails', [
            'blog' => $blog,
            'faqs' => $faqs,
            'pageSeo' => [
                'meta_title'       => $blog->getEffectiveMetaTitle($lang),
                'meta_description' => $blog->getEffectiveMetaDescription($lang),
                'meta_keywords'    => $lang === 'ja'
                    ? ($blog->meta_keywords_ja ?? $blog->meta_keywords ?? '')
                    : ($blog->meta_keywords ?? ''),
                'og_image' => $blog->og_image
                    ? asset('storage/' . $blog->og_image)
                    : ($blog->image ? asset('storage/' . $blog->image) : null),
            ],
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Blog;
use App\Models\BlogPageFaq;
use App\Models\Seo;

class BlogPageController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Blogs', [
            'blogs' => Blog::where('status', 'published')
                ->orderBy('published_date', 'desc')
                ->get(),
            'seo' => Seo::where('page', 'insights')->first(),
        ]);
    }

    public function show(string $slug)
    {
        $blog = Blog::with('pageFaqs')->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
        $faqs = $blog->pageFaqs->isNotEmpty()
            ? $blog->pageFaqs
            : BlogPageFaq::select('id', 'question', 'question_ja', 'answer', 'answer_ja')
            ->orderBy('id')
            ->get();

        return Inertia::render('Blogs/BlogDetails', [
            'blog' => $blog,
            'faqs' => $faqs,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    /**
     * List FAQs (Table + Sheet View)
     */
    public function index()
    {
        return Inertia::render('Admin/Faq/Index', [
            'faqs' => Faq::orderBy("id", "desc")->get(),
        ]);
    }

    /**
     * Store new FAQ (Sheet - Add)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'question'   => 'nullable|string',
            'question_ja'   => 'nullable|string',
            'answer_ja'     => 'nullable|string',
            'answer'     => 'nullable|string',
            'sort_order'   => 'nullable|integer',
        ]);

        Faq::create($data);

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ added successfully');
    }

    /**
     * Update FAQ (Sheet - Edit)
     */
    public function update(Request $request, Faq $faq)
    {
        $data = $request->validate([
            'question'   => 'nullable|string',
            'question_ja'   => 'nullable|string',
            'answer_ja'     => 'nullable|string',
            'answer'     => 'nullable|string',
            'sort_order'   => 'nullable|integer',
        ]); 

        $faq->update($data);

        return redirect()
            ->route('admin.faqs.index')
            ->with('success', 'FAQ updated successfully');
    }

    /**
     * Delete FAQ
     */
    public function destroy(Faq $faq)
    {
        $faq->delete();

        return back()->with('success', 'FAQ deleted successfully');
    }
}

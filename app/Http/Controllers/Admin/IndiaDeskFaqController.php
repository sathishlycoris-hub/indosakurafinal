<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\IndiaDeskFaq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndiaDeskFaqController extends Controller
{
    /**
     * List FAQs (Table + Sheet View)
     */
    public function index()
    {
        return Inertia::render('Admin/IndiaDeskFaq/Index', [
            'faqs' => IndiaDeskFaq::orderBy("id", "desc")->get(),
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

        $data['sort_order'] = !empty($data['sort_order']) ? $data['sort_order'] : 0;
        IndiaDeskFaq::create($data);

        return redirect()
            ->route('admin.india_desk_faqs.index')
            ->with('success', 'FAQ added successfully');
    }

    /**
     * Update FAQ (Sheet - Edit)
     */
    public function update(Request $request, IndiaDeskFaq $indiaDeskFaq)
    {
        $data = $request->validate([
            'question'   => 'nullable|string',
            'question_ja'   => 'nullable|string',
            'answer_ja'     => 'nullable|string',
            'answer'     => 'nullable|string',
            'sort_order'   => 'nullable|integer',
        ]);

        $data['sort_order'] = !empty($data['sort_order']) ? $data['sort_order'] : 0;
        $indiaDeskFaq->update($data);

        return redirect()
            ->route('admin.india_desk_faqs.index')
            ->with('success', 'FAQ updated successfully');
    }

    /**
     * Delete FAQ
     */
    public function destroy(IndiaDeskFaq $indiaDeskFaq)
    {
        $indiaDeskFaq->delete();

        return back()->with('success', 'FAQ deleted successfully');
    }
}

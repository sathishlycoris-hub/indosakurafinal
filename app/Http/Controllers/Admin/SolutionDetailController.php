<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Solution;
use App\Models\SolutionDetail;
use Inertia\Inertia;

class SolutionDetailController extends Controller
{
    //
    public function index(Request $request)
    {
        $type = $request->type ?? 'key'; // default = key features

        return Inertia::render('Admin/SolutionDetail/Index', [
            "solutions" => Solution::select("id", "title")->get(),
            "type" => $type,
            "details" => SolutionDetail::with("solution")
                ->where("type", $type)
                ->orderBy("id", "desc")
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            "solution_id" => "required",
            "type" => "required|in:key,case,industry",
            "title" => "required|string",
            "title_jap" => "nullable|string",
            "content" => "nullable|string",
            "content_jap" => "nullable|string",
        ]);

        SolutionDetail::create($data);

        return back()->with("message", "Record added successfully!");
    }

    public function update(Request $request, SolutionDetail $solutionDetail)
    {
        $data = $request->validate([
            "solution_id" => "required",
            "type" => "required|in:key,case,industry",
            "title" => "required|string",
            "title_jap" => "nullable|string",
            "content" => "nullable|string",
            "content_jap" => "nullable|string",
        ]);

        $solutionDetail->update($data);

        return back()->with("message", "Record updated successfully!");
    }

     public function destroy(SolutionDetail $solutionDetail)
    {
        $solutionDetail->delete();

        return back()->with("message", "Record deleted successfully!");
    }
}

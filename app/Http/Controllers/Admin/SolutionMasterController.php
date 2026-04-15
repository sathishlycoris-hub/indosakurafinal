<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Solution;
use App\Models\SolutionMaster;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SolutionMasterController extends Controller
{
    /* -----------------------------------------------------------
     | INDEX: Load masters + all solutions (dropdown)
     |------------------------------------------------------------*/
    public function index()
    {
        return Inertia::render("Admin/SolutionMaster/Index", [
            "masters" => SolutionMaster::with("solution:id,title")
                ->orderBy("id", "desc")
                ->get(),

            "solutionsList" => Solution::select("id", "title")->get(),

            "flash" => session("message"),
        ]);
    }

    /* -----------------------------------------------------------
     | STORE
     |------------------------------------------------------------*/
    public function store(Request $request)
    {
        $data = $request->validate([
            "solution_id" => "required|exists:solutions,id",
            "key_items" => "nullable|array",
            "case_items" => "nullable|array",
            "industry_items" => "nullable|array",
        ]);

        SolutionMaster::create($data);

        return redirect()
            ->route("admin.solution-master.index")
            ->with("message", "Master record created successfully!");
    }

    /* -----------------------------------------------------------
     | UPDATE
     |------------------------------------------------------------*/
    public function update(Request $request, SolutionMaster $solutionMaster)
    {
        $data = $request->validate([
            "solution_id" => "required|exists:solutions,id",
            "key_items" => "nullable|array",
            "case_items" => "nullable|array",
            "industry_items" => "nullable|array",
        ]);

        $solutionMaster->update($data);

        return redirect()
            ->route("admin.solution-master.index")
            ->with("message", "Master record updated successfully!");
    }

    /* -----------------------------------------------------------
     | DELETE
     |------------------------------------------------------------*/
    public function destroy(SolutionMaster $solutionMaster)
    {
        $solutionMaster->delete();

        return redirect()
            ->route("admin.solution-master.index")
            ->with("message", "Master record deleted successfully!");
    }
}

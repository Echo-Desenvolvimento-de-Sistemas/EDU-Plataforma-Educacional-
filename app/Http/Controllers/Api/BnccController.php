<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BnccSkill;
use Illuminate\Http\Request;

class BnccController extends Controller
{
    public function search(Request $request)
    {
        $query = BnccSkill::query();

        // Search by text (Code or Description)
        if ($request->filled('search')) {
            $term = $request->search;
            $query->where(function ($q) use ($term) {
                $q->where('code', 'like', "%{$term}%")
                    ->orWhere('description', 'like', "%{$term}%");
            });
        }

        // Filter by Component (optional)
        if ($request->filled('component')) {
            $query->where('component', 'like', "%{$request->component}%");
        }

        // Filter by Grade (optional)
        if ($request->filled('grade')) {
            $query->where('grade_year', 'like', "%{$request->grade}%");
        }

        $skills = $query->paginate(20);

        return response()->json($skills);
    }
}

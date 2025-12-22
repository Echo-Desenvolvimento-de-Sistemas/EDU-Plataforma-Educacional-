<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use App\Models\GradingPeriod;
use Illuminate\Http\Request;

class GradingPeriodController extends Controller
{
    public function store(Request $request, AcademicYear $academicYear)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $academicYear->gradingPeriods()->create($validated);

        return back()->with('success', 'Período avaliativo criado com sucesso.');
    }

    public function destroy(GradingPeriod $gradingPeriod)
    {
        $gradingPeriod->delete();

        return back()->with('success', 'Período avaliativo removido com sucesso.');
    }
}

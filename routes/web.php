<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    if (auth()->check()) {
        $role = auth()->user()->role;
        return redirect()->route($role . '.dashboard');
    }

    return Inertia::render('auth/login', [
        'canResetPassword' => Features::enabled(Features::resetPasswords()),
        'canRegister' => Features::enabled(Features::registration()),
        'status' => session('status'),
    ]);
})->name('home');

Route::get('/magic-login/{user}', [\App\Http\Controllers\Auth\MagicLoginController::class, 'verify'])
    ->name('magic-login.verify')
    ->middleware('signed');

Route::middleware(['auth'])->prefix('agenda')->name('agenda.')->group(function () {
    Route::get('/inbox', [\App\Http\Controllers\AgendaController::class, 'index'])->name('inbox');
    Route::get('/channels/{channel}', [\App\Http\Controllers\AgendaController::class, 'show'])->name('channel');
    Route::get('/channels/{channel}/poll', [\App\Http\Controllers\AgendaController::class, 'poll'])->name('channel.poll');
    Route::post('/messages/{message}/read', [\App\Http\Controllers\AgendaController::class, 'markAsRead'])->name('messages.read');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // First Access
    Route::get('/first-access', [\App\Http\Controllers\FirstAccessController::class, 'index'])->name('first-access.index');
    Route::post('/first-access', [\App\Http\Controllers\FirstAccessController::class, 'store'])->name('first-access.store');

    Route::get('/dashboard', function () {
        $role = auth()->user()->role;
        return redirect()->route($role . '.dashboard');
    })->name('dashboard');

    // Global Calendar
    Route::resource('events', \App\Http\Controllers\SchoolEventController::class);

    // Manual/Help
    Route::get('/manual', [\App\Http\Controllers\ManualController::class, 'index'])->name('manual');

    // User Kanban
    Route::get('/kanban', [\App\Http\Controllers\KanbanController::class, 'index'])->name('kanban.index');
    Route::get('/kanban/{kanbanBoard}', [\App\Http\Controllers\KanbanController::class, 'show'])->name('kanban.show');
    Route::post('/kanban/cards', [\App\Http\Controllers\KanbanController::class, 'storeCard'])->name('kanban.cards.store');
    Route::patch('/kanban/cards/{card}/move', [\App\Http\Controllers\KanbanController::class, 'moveCard'])->name('kanban.cards.move');
    Route::put('/kanban/cards/{card}', [\App\Http\Controllers\KanbanController::class, 'updateCard'])->name('kanban.cards.update');

    Route::middleware('role:secretaria')->prefix('secretaria')->name('secretaria.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Secretaria\DashboardController::class, 'index'])->name('dashboard');

        Route::resource('users', \App\Http\Controllers\Secretaria\UserController::class);
        Route::resource('pre-registrations', \App\Http\Controllers\Secretaria\PreRegistrationController::class)->only(['index', 'store', 'show', 'destroy']);

        Route::get('/grades', [\App\Http\Controllers\Secretaria\GradeController::class, 'index'])->name('grades.index');
        Route::get('/grades/{classRoom}', [\App\Http\Controllers\Secretaria\GradeController::class, 'show'])->name('grades.show');
        Route::get('/grades/student/{student}', [\App\Http\Controllers\Secretaria\GradeController::class, 'reportCard'])->name('grades.report-card');

        // Attendance (Reuse Admin Controller)
        Route::get('/attendance', [\App\Http\Controllers\Admin\AttendanceController::class, 'index'])->name('attendance.index');
        Route::get('/attendance/edit', [\App\Http\Controllers\Admin\AttendanceController::class, 'edit'])->name('attendance.edit');
        Route::post('/attendance/batch', [\App\Http\Controllers\Admin\AttendanceController::class, 'batchStore'])->name('attendance.batch');
        Route::get('/attendance/report', [\App\Http\Controllers\Admin\AttendanceController::class, 'frequencyReport'])->name('attendance.report');

        // Batch Enrollment
        Route::get('/batch-enrollment', [\App\Http\Controllers\Secretaria\BatchEnrollmentController::class, 'index'])->name('batch-enrollment.index');
        Route::post('/batch-enrollment', [\App\Http\Controllers\Secretaria\BatchEnrollmentController::class, 'store'])->name('batch-enrollment.store');

        // Subject Performance Analytics for Secretaria
        Route::get('/subject-performance', [\App\Http\Controllers\Admin\SubjectPerformanceController::class, 'index'])->name('subject-performance.index');
        Route::get('/subject-performance/{subject}', [\App\Http\Controllers\Admin\SubjectPerformanceController::class, 'show'])->name('subject-performance.show');
    });

    Route::middleware('role:professor')->prefix('professor')->name('professor.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Professor\DashboardController::class, 'index'])->name('dashboard');

        Route::get('/classes', [\App\Http\Controllers\Professor\ClassRoomController::class, 'index'])->name('classes.index');
        Route::get('/classes/{classRoom}', [\App\Http\Controllers\Professor\ClassRoomController::class, 'show'])->name('classes.show');
        Route::get('/classes/{classRoom}/students/{student}', [\App\Http\Controllers\Professor\ClassRoomController::class, 'student'])->name('classes.student.show');

        // Attendance
        Route::get('/classes/{classRoom}/attendance/create', [\App\Http\Controllers\Professor\AttendanceController::class, 'create'])->name('classes.attendance.create');
        Route::post('/classes/{classRoom}/attendance', [\App\Http\Controllers\Professor\AttendanceController::class, 'store'])->name('classes.attendance.store');

        // Assessments
        Route::post('/classes/{classRoom}/assessments', [\App\Http\Controllers\Professor\AssessmentController::class, 'store'])->name('assessments.store');
        Route::put('/classes/{classRoom}/assessments/{assessment}', [\App\Http\Controllers\Professor\AssessmentController::class, 'update'])->name('assessments.update');
        Route::delete('/classes/{classRoom}/assessments/{assessment}', [\App\Http\Controllers\Professor\AssessmentController::class, 'destroy'])->name('assessments.destroy');

        // Grades Grid (New UI)
        Route::get('/grades', [\App\Http\Controllers\Professor\GradeController::class, 'entry'])->name('grades.entry');

        // Grades
        Route::get('/classes/{classRoom}/grades', [\App\Http\Controllers\Professor\GradeController::class, 'index'])->name('grades.index'); // API for grid
        Route::post('/classes/{classRoom}/grades/batch', [\App\Http\Controllers\Professor\GradeController::class, 'storeBatch'])->name('grades.batch');

        // Shortcuts / Placeholders
        Route::get('/calendar', function () {
            return Inertia::render('Professor/Calendar');
        })->name('calendar');
        Route::get('/reports', [\App\Http\Controllers\Professor\ReportController::class, 'index'])->name('reports');
        Route::get('/manual', function () {
            return Inertia::render('Professor/Manual');
        })->name('manual');

        // Agenda Message
        Route::post('/agenda/message', [\App\Http\Controllers\Admin\AgendaController::class, 'sendMessage'])->name('agenda.message');

        // Activities
        Route::resource('activities', \App\Http\Controllers\Professor\ActivityController::class);

        // Question Banks & Questions
        Route::resource('question-banks', \App\Http\Controllers\Professor\QuestionBankController::class);
        Route::resource('questions', \App\Http\Controllers\Professor\QuestionController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
    });

    Route::middleware('role:aluno')->prefix('aluno')->name('aluno.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Student\DashboardController::class, 'index'])->name('dashboard');

        Route::get('/documents', [\App\Http\Controllers\Student\DocumentController::class, 'index'])->name('documents.index');
        Route::post('/documents', [\App\Http\Controllers\Student\DocumentController::class, 'store'])->name('documents.store');
        Route::get('/documents/{document}', [\App\Http\Controllers\Student\DocumentController::class, 'show'])->name('documents.show');

        // New Features
        Route::get('/grades', [\App\Http\Controllers\Student\GradeController::class, 'index'])->name('grades.index');
        Route::get('/attendance', [\App\Http\Controllers\Student\AttendanceController::class, 'index'])->name('attendance.index');
        Route::get('/schedules', [\App\Http\Controllers\Student\ClassScheduleController::class, 'index'])->name('schedules.index');

        // Activity Player
        Route::get('/activities/{activity}/play', [\App\Http\Controllers\Student\PlayerController::class, 'start'])->name('activities.play');
        Route::post('/activities/{activity}/submit', [\App\Http\Controllers\Student\PlayerController::class, 'submit'])->name('activities.submit');
    });

    Route::middleware('role:responsavel')->prefix('responsavel')->name('responsavel.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Responsavel\DashboardController::class, 'index'])->name('dashboard');
    });

    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

        // Subject Performance Analytics
        Route::get('/subject-performance', [\App\Http\Controllers\Admin\SubjectPerformanceController::class, 'index'])->name('subject-performance.index');
        Route::get('/subject-performance/{subject}', [\App\Http\Controllers\Admin\SubjectPerformanceController::class, 'show'])->name('subject-performance.show');

        // Resources
        Route::resource('academic-years', \App\Http\Controllers\Admin\AcademicYearController::class);
        Route::post('/academic-years/{academicYear}/grading-periods', [\App\Http\Controllers\Admin\GradingPeriodController::class, 'store'])->name('academic-years.grading-periods.store');
        Route::delete('/grading-periods/{gradingPeriod}', [\App\Http\Controllers\Admin\GradingPeriodController::class, 'destroy'])->name('grading-periods.destroy');
        Route::resource('education-levels', \App\Http\Controllers\Admin\EducationLevelController::class);
        Route::resource('grades', \App\Http\Controllers\Admin\GradeController::class);
        Route::resource('subjects', \App\Http\Controllers\Admin\SubjectController::class);
        Route::resource('class-rooms', \App\Http\Controllers\Admin\ClassRoomController::class);
        Route::resource('guardians', \App\Http\Controllers\Admin\GuardianController::class);
        Route::resource('guardians', \App\Http\Controllers\Admin\GuardianController::class);
        Route::get('/students/{student}/attendance', [\App\Http\Controllers\Admin\StudentController::class, 'attendance'])->name('students.attendance');
        Route::resource('students', \App\Http\Controllers\Admin\StudentController::class);
        Route::resource('guardians', \App\Http\Controllers\Admin\GuardianController::class);
        Route::post('pre-registrations/batch-migrate', [\App\Http\Controllers\Admin\PreRegistrationController::class, 'batchMigrate'])->name('pre-registrations.batch-migrate');
        Route::post('pre-registrations/{id}/migrate', [\App\Http\Controllers\Admin\PreRegistrationController::class, 'migrate'])->name('pre-registrations.migrate');
        Route::resource('pre-registrations', \App\Http\Controllers\Admin\PreRegistrationController::class)->only(['index', 'store', 'show', 'destroy']);
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class);

        // Guardian Student Management
        Route::post('/guardians/{guardian}/students', [\App\Http\Controllers\Admin\GuardianController::class, 'attachStudent'])->name('guardians.students.store');
        Route::delete('/guardians/{guardian}/students/{student}', [\App\Http\Controllers\Admin\GuardianController::class, 'detachStudent'])->name('guardians.students.destroy');
        Route::get('/api/classes/{classRoom}/students', [\App\Http\Controllers\Admin\GuardianController::class, 'getStudentsByClass'])->name('api.classes.students');

        Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
        Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
        Route::post('/settings/whatsapp/connect', [App\Http\Controllers\Admin\AgendaSettingController::class, 'connectWhatsapp'])->name('settings.whatsapp.connect');
        Route::get('/settings/whatsapp/status', [App\Http\Controllers\Admin\AgendaSettingController::class, 'checkWhatsappStatus'])->name('settings.whatsapp.status');
        Route::post('/settings/whatsapp/disconnect', [App\Http\Controllers\Admin\AgendaSettingController::class, 'disconnectWhatsapp'])->name('settings.whatsapp.disconnect');

        // Status Toggling
        Route::patch('/users/{user}/toggle-status', [\App\Http\Controllers\Admin\UserController::class, 'toggleStatus'])->name('users.toggle-status');
        Route::patch('/guardians/{guardian}/toggle-status', [\App\Http\Controllers\Admin\GuardianController::class, 'toggleStatus'])->name('guardians.toggle-status');
        Route::patch('/students/{student}/toggle-status', [\App\Http\Controllers\Admin\StudentController::class, 'toggleStatus'])->name('students.toggle-status');

        // User Integration
        Route::post('/students/{student}/user', [\App\Http\Controllers\Admin\StudentController::class, 'createUser'])->name('students.user.store');
        Route::post('/students/{student}/reset-password', [\App\Http\Controllers\Admin\StudentController::class, 'resetPassword'])->name('students.password.update');
        Route::post('/students/{student}/documents', [\App\Http\Controllers\Admin\StudentDocumentController::class, 'store'])->name('students.documents.store');
        Route::post('/guardians/{guardian}/user', [\App\Http\Controllers\Admin\GuardianController::class, 'createUser'])->name('guardians.user.store');

        Route::resource('document-templates', \App\Http\Controllers\Admin\DocumentTemplateController::class);
        Route::resource('documents', \App\Http\Controllers\Admin\DocumentController::class)->only(['index', 'create', 'store']);

        // Agenda Digital
        Route::get('/agenda', [\App\Http\Controllers\Admin\AgendaController::class, 'index'])->name('agenda.index');
        Route::post('/agenda', [\App\Http\Controllers\Admin\AgendaController::class, 'store'])->name('agenda.store');
        Route::post('/agenda/message', [\App\Http\Controllers\Admin\AgendaController::class, 'sendMessage'])->name('agenda.send');

        // Agenda Settings & Permissions
        Route::get('/agenda/settings', [\App\Http\Controllers\Admin\AgendaSettingController::class, 'index'])->name('agenda.settings');
        Route::put('/agenda/{channel}', [\App\Http\Controllers\Admin\AgendaSettingController::class, 'update'])->name('agenda.update');
        Route::delete('/agenda/{channel}', [\App\Http\Controllers\Admin\AgendaSettingController::class, 'destroy'])->name('agenda.destroy');
        Route::post('/agenda/{channel}/users', [\App\Http\Controllers\Admin\AgendaSettingController::class, 'attachUser'])->name('agenda.users.store');
        Route::delete('/agenda/{channel}/users/{user}', [\App\Http\Controllers\Admin\AgendaSettingController::class, 'detachUser'])->name('agenda.users.destroy');

        // Ensalamento
        Route::get('/ensalamento', [\App\Http\Controllers\Admin\EnsalamentoController::class, 'index'])->name('ensalamento.index');
        Route::post('/ensalamento', [\App\Http\Controllers\Admin\EnsalamentoController::class, 'store'])->name('ensalamento.store');
        Route::delete('/ensalamento', [\App\Http\Controllers\Admin\EnsalamentoController::class, 'destroy'])->name('ensalamento.destroy');

        // Student Grades (Notas)
        Route::get('/student-grades', [\App\Http\Controllers\Admin\StudentGradeController::class, 'index'])->name('student-grades.index');
        Route::get('/student-grades/{classRoom}', [\App\Http\Controllers\Admin\StudentGradeController::class, 'show'])->name('student-grades.show');
        Route::get('/student-grades/student/{student}', [\App\Http\Controllers\Admin\StudentGradeController::class, 'reportCard'])->name('student-grades.report-card');

        // Attendance (Frequência)
        Route::get('/attendance', [\App\Http\Controllers\Admin\AttendanceController::class, 'index'])->name('attendance.index');
        Route::get('/attendance/edit', [\App\Http\Controllers\Admin\AttendanceController::class, 'edit'])->name('attendance.edit');
        Route::post('/attendance/batch', [\App\Http\Controllers\Admin\AttendanceController::class, 'batchStore'])->name('attendance.batch');
        Route::get('/attendance/report', [\App\Http\Controllers\Admin\AttendanceController::class, 'frequencyReport'])->name('attendance.report');

        // Class Schedules (Horários)
        Route::get('/class-schedules', [\App\Http\Controllers\Admin\ClassScheduleController::class, 'index'])->name('class-schedules.index');
        Route::get('/class-schedules/{classRoom}', [\App\Http\Controllers\Admin\ClassScheduleController::class, 'getByClass'])->name('class-schedules.by-class');
        Route::post('/class-schedules', [\App\Http\Controllers\Admin\ClassScheduleController::class, 'store'])->name('class-schedules.store');
        Route::delete('/class-schedules/{schedule}', [\App\Http\Controllers\Admin\ClassScheduleController::class, 'destroy'])->name('class-schedules.destroy');
        // Kanban Boards
        Route::resource('kanban', \App\Http\Controllers\Admin\KanbanBoardController::class);
        Route::post('/kanban/{kanbanBoard}/users', [\App\Http\Controllers\Admin\KanbanBoardController::class, 'storeUser'])->name('kanban.users.store');
        Route::delete('/kanban/{kanbanBoard}/users/{user}', [\App\Http\Controllers\Admin\KanbanBoardController::class, 'removeUser'])->name('kanban.users.destroy');
    });
});

Route::get('/pre-matricula/sucesso', function () {
    return Inertia::render('Public/PreRegistration/Success');
})->name('pre-registration.success');

Route::get('/pre-matricula/{token}', [\App\Http\Controllers\Public\PreRegistrationController::class, 'show'])->name('pre-registration.show');
Route::post('/pre-matricula/{token}', [\App\Http\Controllers\Public\PreRegistrationController::class, 'store'])->name('pre-registration.store');

Route::get('/validate-document/{uuid}', [\App\Http\Controllers\Public\DocumentValidationController::class, 'validateDocument'])->name('documents.validate');

Route::prefix('public')->name('public.')->group(function () {
    Route::resource('users', \App\Http\Controllers\Public\UserController::class)->only(['index', 'edit', 'update']);
});

require __DIR__ . '/settings.php';

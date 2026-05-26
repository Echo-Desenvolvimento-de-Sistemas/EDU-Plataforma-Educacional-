<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Student;
use App\Models\Guardian;
use App\Models\ClassRoom;
use App\Models\Channel;
use App\Models\Message;
use App\Models\EducationLevel;
use App\Models\Grade;
use App\Models\AcademicYear;
use App\Jobs\ProcessMessageRecipientsJob;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;

class AgendaCustomRecipientTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $student1;
    protected $student2;
    protected $student3;
    protected $guardian1;
    protected $classRoom;

    protected function setUp(): void
    {
        parent::setUp();

        // Setup base models
        $this->admin = User::factory()->create(['role' => 'admin', 'active' => true, 'first_access' => false]);

        $level = EducationLevel::create(['name' => 'Fundamental 1', 'code' => 'F1']);
        $grade = Grade::create(['name' => '1º Ano', 'education_level_id' => $level->id]);
        $academicYear = AcademicYear::create(['year' => '2025', 'start_date' => '2025-01-01', 'end_date' => '2025-12-31']);
        
        $this->classRoom = ClassRoom::create([
            'name' => 'Turma A', 
            'grade_id' => $grade->id, 
            'academic_year_id' => $academicYear->id,
            'shift' => 'matutino'
        ]);

        // Users for students
        $u1 = User::factory()->create(['role' => 'aluno', 'active' => true, 'first_access' => false]);
        $u2 = User::factory()->create(['role' => 'aluno', 'active' => true, 'first_access' => false]);
        $u3 = User::factory()->create(['role' => 'aluno', 'active' => true, 'first_access' => false]);

        $this->student1 = Student::create(['name' => 'Aluno 1', 'birth_date' => '2015-05-05', 'class_room_id' => $this->classRoom->id, 'user_id' => $u1->id]);
        $this->student2 = Student::create(['name' => 'Aluno 2', 'birth_date' => '2015-05-05', 'class_room_id' => $this->classRoom->id, 'user_id' => $u2->id]);
        $this->student3 = Student::create(['name' => 'Aluno 3', 'birth_date' => '2015-05-05', 'class_room_id' => $this->classRoom->id, 'user_id' => $u3->id]);

        // Guardian for student 1
        $ug = User::factory()->create(['role' => 'responsavel', 'active' => true, 'first_access' => false]);
        $this->guardian1 = Guardian::create([
            'name' => 'Responsavel 1',
            'email' => $ug->email,
            'cpf' => '12345678901',
            'user_id' => $ug->id,
            'active' => true
        ]);
        
        DB::table('guardian_student')->insert([
            'guardian_id' => $this->guardian1->id,
            'student_id' => $this->student1->id,
            'kinship' => 'pai',
            'is_financial_responsible' => true,
            'is_pedagogic_responsible' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function test_can_create_broadcast_channel_with_specific_students()
    {
        $payload = [
            'name' => 'Grupo Customizado',
            'type' => 'BROADCAST',
            'icon' => 'message-circle',
            'is_active' => true,
            'can_reply' => false,
            'student_ids' => [$this->student1->id, $this->student2->id]
        ];

        $response = $this->actingAs($this->admin)
            ->postJson(route('admin.agenda.store'), $payload);

        $response->assertStatus(302); // Redirect back on web route

        $channel = Channel::where('title', 'Grupo Customizado')->first();
        $this->assertNotNull($channel);
        $this->assertEquals('BROADCAST', $channel->type);

        // Check pivot table
        $this->assertDatabaseHas('channel_student', [
            'channel_id' => $channel->id,
            'student_id' => $this->student1->id
        ]);
        $this->assertDatabaseHas('channel_student', [
            'channel_id' => $channel->id,
            'student_id' => $this->student2->id
        ]);
        $this->assertDatabaseMissing('channel_student', [
            'channel_id' => $channel->id,
            'student_id' => $this->student3->id
        ]);
    }

    public function test_can_attach_and_detach_student_from_channel()
    {
        $channel = Channel::create([
            'title' => 'Grupo Teste',
            'type' => 'BROADCAST',
            'icon_path' => 'message-circle',
            'is_active' => true,
            'can_reply' => false
        ]);

        // Attach student
        $response = $this->actingAs($this->admin)
            ->postJson(route('admin.agenda.students.store', $channel->id), [
                'student_id' => $this->student1->id
            ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('channel_student', [
            'channel_id' => $channel->id,
            'student_id' => $this->student1->id
        ]);

        // Detach student
        $response = $this->actingAs($this->admin)
            ->deleteJson(route('admin.agenda.students.destroy', [$channel->id, $this->student1->id]));

        $response->assertStatus(200);
        $this->assertDatabaseMissing('channel_student', [
            'channel_id' => $channel->id,
            'student_id' => $this->student1->id
        ]);
    }

    public function test_resolves_recipients_only_for_custom_students_and_guardians()
    {
        $channel = Channel::create([
            'title' => 'Grupo Customizado',
            'type' => 'BROADCAST',
            'icon_path' => 'message-circle',
            'is_active' => true,
            'can_reply' => false
        ]);

        // Restrict to student1 (which has guardian1) and student2
        $channel->students()->sync([$this->student1->id, $this->student2->id]);

        $message = Message::create([
            'channel_id' => $channel->id,
            'sender_id' => $this->admin->id,
            'content' => 'Ola grupo',
            'type' => 'text'
        ]);

        // Run the job synchronously
        $job = new ProcessMessageRecipientsJob($message, 'both', []);
        $job->handle();

        // Should deliver to student1 (user_id), guardian1 (user_id), student2 (user_id)
        // Should NOT deliver to student3 (user_id)
        $this->assertDatabaseHas('message_recipients', [
            'message_id' => $message->id,
            'user_id' => $this->student1->user_id
        ]);
        $this->assertDatabaseHas('message_recipients', [
            'message_id' => $message->id,
            'user_id' => $this->guardian1->user_id
        ]);
        $this->assertDatabaseHas('message_recipients', [
            'message_id' => $message->id,
            'user_id' => $this->student2->user_id
        ]);
        $this->assertDatabaseMissing('message_recipients', [
            'message_id' => $message->id,
            'user_id' => $this->student3->user_id
        ]);
    }

    public function test_inbox_filtering_restricts_visibility_to_custom_members()
    {
        // 1. Create a global broadcast group (should be visible to everyone)
        $globalChannel = Channel::create([
            'title' => 'Comunicados Gerais',
            'type' => 'BROADCAST',
            'icon_path' => 'message-circle',
            'is_active' => true,
            'can_reply' => false
        ]);

        // 2. Create a restricted broadcast group (restricted to student1)
        $restrictedChannel = Channel::create([
            'title' => 'Clube do Livro',
            'type' => 'BROADCAST',
            'icon_path' => 'message-circle',
            'is_active' => true,
            'can_reply' => false
        ]);
        $restrictedChannel->students()->sync([$this->student1->id]);

        // Student 1 (restricted member) views the channels
        $response1 = $this->actingAs($this->student1->user)
            ->getJson(route('agenda.inbox')); // using index or whatever route returns channels

        $response1->assertStatus(200);
        $channels1 = collect($response1->json()['channels']);
        
        $this->assertTrue($channels1->contains('id', $globalChannel->id));
        $this->assertTrue($channels1->contains('id', $restrictedChannel->id));

        // Student 2 (non-restricted member) views the channels
        $response2 = $this->actingAs($this->student2->user)
            ->getJson(route('agenda.inbox'));

        $response2->assertStatus(200);
        $channels2 = collect($response2->json()['channels']);

        $this->assertTrue($channels2->contains('id', $globalChannel->id));
        $this->assertFalse($channels2->contains('id', $restrictedChannel->id));

        // Guardian 1 (guardian of student 1) views channels
        $responseG = $this->actingAs($this->guardian1->user)
            ->getJson(route('agenda.inbox'));

        $responseG->assertStatus(200);
        $channelsG = collect($responseG->json()['channels']);

        $this->assertTrue($channelsG->contains('id', $globalChannel->id));
        $this->assertTrue($channelsG->contains('id', $restrictedChannel->id));
    }
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'cpf',
        'username',
        'active',
        'password',
        'role',
        'phone',
    ];

    public function allocations()
    {
        return $this->hasMany(Allocation::class);
    }

    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function guardian()
    {
        return $this->hasOne(Guardian::class);
    }

    public function speakingChannels()
    {
        return $this->belongsToMany(Channel::class, 'channel_user');
    }

    public function questionBanks()
    {
        return $this->hasMany(QuestionBank::class);
    }

    public function kanbanBoards()
    {
        return $this->belongsToMany(\App\Models\Kanban\KanbanBoard::class, 'kanban_board_user', 'user_id', 'board_id')
            ->withPivot('permission')
            ->withTimestamps();
    }

    /**
     * Get the user's profile photo URL.
     */
    public function getProfilePhotoUrlAttribute(): ?string
    {
        // For students, use their photo_path
        // Only access student relation if it's already loaded to avoid lazy loading violation
        if ($this->role === 'aluno' && $this->relationLoaded('student')) {
            $student = $this->getRelation('student');
            if ($student && $student->photo_path) {
                return asset('storage/' . $student->photo_path);
            }
        }

        // For other roles, return null to use initials fallback
        // Future enhancement: add photo_path column to users table
        return null;
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['profile_photo_url'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}

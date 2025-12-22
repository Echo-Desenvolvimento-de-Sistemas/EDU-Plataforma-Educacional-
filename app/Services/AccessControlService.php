<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AccessControlService
{
    /**
     * Create a user account for a given model (Student or Guardian).
     *
     * @param Model $model
     * @return User
     * @throws ValidationException
     */
    public function createAccess(Model $model): User
    {
        if ($model->user_id) {
            $user = User::find($model->user_id);
            if ($user) {
                return $user;
            }
        }

        $cpf = preg_replace('/[^0-9]/', '', $model->cpf);

        if (empty($cpf)) {
            throw ValidationException::withMessages([
                'cpf' => 'O registro precisa ter um CPF válido para gerar o acesso.',
            ]);
        }

        $role = $this->determineRole($model);

        // Check if user exists by CPF/Username
        $existingUser = User::where('username', $cpf)->first();
        if ($existingUser) {
            // Link existing user to model and return
            $model->update(['user_id' => $existingUser->id]);
            return $existingUser;
        }

        $email = $model->email;

        // If no email, generate a system default
        if (empty($email)) {
            $domainSuffix = \App\Models\Setting::where('key', 'email_domain_suffix')->value('value') ?: 'sistema';
            $rolePrefix = $role === 'aluno' ? 'aluno' : 'responsavel';
            $email = "{$cpf}@{$rolePrefix}.{$domainSuffix}";
        }

        if (User::where('email', $email)->exists()) {
            // If email exists (and it's not the user we just checked by CPF), it's a conflict
            throw ValidationException::withMessages([
                'email' => "Já existe um usuário com o e-mail {$email} no sistema.",
            ]);
        }

        // Password is the CPF itself
        $password = $cpf;

        $user = User::create([
            'name' => $model->name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => $role,
            'cpf' => $model->cpf,
            'username' => $cpf,
            'active' => true,
        ]);

        $model->update(['user_id' => $user->id]);

        return $user;
    }

    private function determineRole(Model $model): string
    {
        $class = get_class($model);
        if (str_contains($class, 'Student')) {
            return 'aluno';
        }
        if (str_contains($class, 'Guardian')) {
            return 'responsavel';
        }
        return 'user';
    }
}

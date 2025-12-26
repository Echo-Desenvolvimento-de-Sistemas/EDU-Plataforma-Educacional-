<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class MailSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'mail_mailer' => 'smtp',
            'mail_host' => 'smtp.umbler.com',
            'mail_port' => '587',
            'mail_username' => 'naoresponda@echo.dev.br',
            'mail_password' => 'Akio2604*',
            'mail_encryption' => 'tls',
            'mail_from_address' => 'naoresponda@echo.dev.br',
            'mail_from_name' => 'Sistema Educacional', // Generic name, can be changed
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}

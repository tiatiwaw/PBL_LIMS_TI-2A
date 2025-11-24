<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Testing\Fluent\Concerns\Has;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'role',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
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
        ];
    }

    public function getRedirectRoute(): string
    {
        if ($this->hasRole('admin')) {
            return route('admin.index');
        }

        if ($this->hasRole('manager')) {
            return route('manager.index');
        }

        if ($this->hasRole('analyst')) {
            return route('analyst.index');
        }

        if ($this->hasRole('supervisor')) {
            return route('supervisor.order.index');
        }

        if ($this->hasRole('staff')) {
            return route('staff.client.index');
        }

        if ($this->hasRole('client')) {
            return route('client.index');
        }

        return '/';
    }

    public function clients()
    {
        return $this->hasOne(Client::class, 'user_id');
    }

    public function analyst()
    {
        return $this->hasOne(Analyst::class, 'user_id');
    }
}

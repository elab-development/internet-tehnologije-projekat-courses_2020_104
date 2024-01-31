<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'teacher_id'];

    protected $casts = [
        'id' => 'integer',
        'teacher_id' => 'integer',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id', 'id');
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function validateForEdit($user)
    {
        return $user->type == 'admin' || ($user->type == 'teacher' && $this->teacher_id == $user->id);
    }
    public function validateRead($user)
    {
        if ($this->validateForEdit($user)) {
            return true;
        }
        if ($user->type != 'student') {
            return false;
        }
        foreach ($this->users as $courseUser) {
            if ($courseUser->id == $user->id) {
                return true;
            }
        }
        return false;
    }
}

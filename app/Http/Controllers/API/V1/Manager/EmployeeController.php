<?php

namespace App\Http\Controllers\API\V1\Manager;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        try {
            $employee = User::where('role', '!=', 'client')->get();

            return response()->json($employee, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data karyawan.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}

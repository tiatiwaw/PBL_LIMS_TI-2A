<?php 
namespace App\Http\Controllers\API\V1\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class AnalystController extends Controller
{
    public function index()
    {
        $analyst = Analyst::with(['users', 'certificates', 'trainings'])->get();
            return response()->json($analyst);
    }
}
?>
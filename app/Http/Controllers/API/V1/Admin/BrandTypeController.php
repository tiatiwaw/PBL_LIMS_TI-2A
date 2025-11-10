<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\BrandType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BrandTypeController extends Controller
{
    public function index()
    {
        $brands = BrandType::all();

        return response()->json($brands);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brand_types',
        ]);

        $brandType = BrandType::create($validated);

        return response()->json([
            'message' => 'Tipe Merek berhasil dibuat.',
            'data' => $brandType,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $brandType = BrandType::findOrFail($id);

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('brand_types')->ignore($brandType->id),
            ],
        ]);

        $brandType->update($validated);

        return response()->json([
            'message' => 'Tipe Merek berhasil diperbarui.',
            'data' => $brandType,
        ]);
    }

    public function destroy($id)
    {
        $brandType = BrandType::findOrFail($id);
        $brandType->delete();

        return response()->json([
            'message' => 'Tipe Merek berhasil dihapus.',
        ], 200);
    }
}

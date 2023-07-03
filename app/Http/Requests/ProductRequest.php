<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['integer', 'exists:categories,id'],
            'brand_id' => ['integer', 'exists:brands,id'],
            'name' => ['required', 'string'],
            'price' => ['required', 'decimal:2'],
            'stock' => ['required', 'integer', 'min:0'],
            'slug' => ['string', 'nullable'],
            'description' => ['required', 'string'],
            'images' => ['array'],
            'images.*' => ['image', 'max:8192']
        ];
    }
}

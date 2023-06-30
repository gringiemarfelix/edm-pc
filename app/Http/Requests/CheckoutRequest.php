<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CheckoutRequest extends FormRequest
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
            'address' => ['required', 'string', 'exists:user_addresses,address'],
            'address_id' => ['required', 'integer', 'exists:user_addresses,id'],
            'delivery' => ['required', 'string', Rule::in(['lalamove', 'standard'])],
            'pay' => ['required', 'string', Rule::in(['links', 'checkout'])],
            'lalamove' => ['string', Rule::in(['motorcycle', 'car'])],
        ];
    }
}

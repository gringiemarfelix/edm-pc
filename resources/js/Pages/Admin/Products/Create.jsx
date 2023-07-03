import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import ProductForm from "@/Components/Admin/Forms/ProductForm"

const Create = () => {
  return (
    <AdminLayout>
      <Head title="Create Product" />
      <div className="w-full min-h-[inherit] flex items-center justify-center p-6">
        <ProductForm />
      </div>
    </AdminLayout>
  )
}

export default Create
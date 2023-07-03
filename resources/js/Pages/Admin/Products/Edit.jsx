import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import ProductForm from "@/Components/Admin/Forms/ProductForm"

const Edit = ({ product }) => {
  return (
    <AdminLayout>
      <Head title="Edit Product" />
      <div className="w-full min-h-[inherit] flex items-center justify-center p-6">
        <ProductForm product={product} />
      </div>
    </AdminLayout>
  )
}

export default Edit
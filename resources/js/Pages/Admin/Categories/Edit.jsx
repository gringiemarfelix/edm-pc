import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import CategoryForm from "@/Components/Admin/Forms/CategoryForm"

const Edit = ({ category }) => {
  return (
    <AdminLayout>
      <Head title="Edit Category" />
      <div className="w-full min-h-[inherit] flex items-center justify-center p-6">
        <CategoryForm category={category} />
      </div>
    </AdminLayout>
  )
}

export default Edit
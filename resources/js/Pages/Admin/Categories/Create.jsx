import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import CategoryForm from "@/Components/Admin/Forms/CategoryForm"

const Create = () => {
  return (
    <AdminLayout>
      <Head title="Create Category" />
      <div className="w-full min-h-[inherit] flex items-center justify-center p-6">
        <CategoryForm />
      </div>
    </AdminLayout>
  )
}

export default Create
import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import BrandForm from "@/Components/Admin/Forms/BrandForm"

const Create = () => {
  return (
    <AdminLayout>
      <Head title="Create Brand" />
      <div className="w-full min-h-[inherit] flex items-center justify-center p-6">
        <BrandForm />
      </div>
    </AdminLayout>
  )
}

export default Create
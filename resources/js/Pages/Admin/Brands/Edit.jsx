import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import BrandForm from "@/Components/Admin/Forms/BrandForm"

const Edit = ({ brand }) => {
  return (
    <AdminLayout>
      <Head title="Edit Brand" />
      <div className="w-full min-h-[inherit] flex items-center justify-center p-6">
        <BrandForm brand={brand} />
      </div>
    </AdminLayout>
  )
}

export default Edit
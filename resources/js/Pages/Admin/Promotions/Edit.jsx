import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import PromotionForm from "@/Components/Admin/Forms/PromotionForm"

const Create = ({ promotion }) => {
  return (
    <AdminLayout>
      <Head title="Edit Promotion" />
      <div className="w-full min-h-[inherit] flex items-center justify-center p-6">
        <PromotionForm promotion={promotion} />
      </div>
    </AdminLayout>
  )
}

export default Create
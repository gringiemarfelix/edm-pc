import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import PromotionForm from "@/Components/Admin/Forms/PromotionForm"

const Create = () => {
  return (
    <AdminLayout>
      <Head title="Create Promotion" />
      <div className="w-full min-h-[inherit] flex items-center justify-center p-6">
        <PromotionForm />
      </div>
    </AdminLayout>
  )
}

export default Create
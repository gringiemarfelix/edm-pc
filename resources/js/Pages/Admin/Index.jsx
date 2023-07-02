import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"

const Index = () => {
  return (
    <AdminLayout>
      <Head title="Dashboard" />
      <div className="h-full w-full flex items-center p-6">
        Dashboard
      </div>
    </AdminLayout>
  )
}

export default Index
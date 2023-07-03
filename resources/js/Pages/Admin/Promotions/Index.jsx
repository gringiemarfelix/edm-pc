import Promotion from "@/Components/Admin/Promotion"
import AdminLayout from "@/Layouts/AdminLayout"
import { Head, Link } from "@inertiajs/react"
import { Button, Typography } from "@material-tailwind/react"
import { PlusIcon } from "@heroicons/react/24/solid";

const Index = ({ promotions }) => {
  return (
    <AdminLayout>
      <Head title="Promotions" />
      <div className="h-full w-full">
        <div className="flex w-fit gap-3 p-6">
          <Typography variant="h4">
            Promotions
          </Typography>
          <Link href={route('admin.promotions.create')}>
            <Button variant="gradient" className="flex items-center gap-3" size="sm">
              <PlusIcon className="h-5 w-5" />
              New
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {
            promotions.map(promotion =>
              <Promotion key={promotion.id} promotion={promotion} />
            )
          }
        </div>
      </div>
    </AdminLayout>
  )
}

export default Index
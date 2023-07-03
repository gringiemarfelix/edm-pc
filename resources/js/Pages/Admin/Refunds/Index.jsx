import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import { Card, Typography, } from "@material-tailwind/react"

const TABLE_HEAD = ["#", "Order #", "User","Reason", ""];

const Index = ({ refunds }) => {
  return (
    <AdminLayout>
      <Head title="Refunds" />
      <div className="h-full w-full min-h-screen">
        <div className="flex w-fit gap-3 p-6">
          <Typography variant="h4">
            Refunds
          </Typography>
        </div>
        <div className="lg:m-6 h-full">
          <Card>
            <div className="w-full h-full flex items-center justify-center p-24">
              <Typography variant="h6" color="gray">
                No refunds found.
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Index
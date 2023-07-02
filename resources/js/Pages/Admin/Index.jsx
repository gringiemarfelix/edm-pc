import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import { Card, CardBody, Typography } from "@material-tailwind/react"
import { UserCircleIcon, TruckIcon, Squares2X2Icon, ShoppingBagIcon } from "@heroicons/react/24/solid";

const Index = () => {
  return (
    <AdminLayout>
      <Head title="Dashboard" />
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        <Card>
          <CardBody className="flex justify-between">
            <div className="flex flex-col">
              <Typography variant="h6" color="gray">
                Users
              </Typography>
              <Typography variant="h3" color="blue-gray">
                0
              </Typography>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 h-fit">
              <UserCircleIcon className="h-10 w-10 text-blue-500" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex justify-between">
            <div className="flex flex-col">
              <Typography variant="h6" color="gray">
                Orders
              </Typography>
              <Typography variant="h3" color="blue-gray">
                0
              </Typography>
            </div>
            <div className="rounded-lg p-3 bg-purple-50 h-fit">
              <TruckIcon className="h-10 w-10 text-purple-500" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex justify-between">
            <div className="flex flex-col">
              <Typography variant="h6" color="gray">
                Products
              </Typography>
              <Typography variant="h3" color="blue-gray">
                0
              </Typography>
            </div>
            <div className="rounded-lg p-3 bg-teal-50 h-fit">
              <ShoppingBagIcon className="h-10 w-10 text-teal-500" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex justify-between">
            <div className="flex flex-col">
              <Typography variant="h6" color="gray">
                Brands
              </Typography>
              <Typography variant="h3" color="blue-gray">
                0
              </Typography>
            </div>
            <div className="rounded-lg p-3 bg-deep-orange-50 h-fit">
              <Squares2X2Icon className="h-10 w-10 text-deep-orange-500" />
            </div>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default Index
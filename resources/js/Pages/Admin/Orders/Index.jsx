import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout"
import { Head, router } from "@inertiajs/react"
import { Avatar, Card, Typography, Select, Option, IconButton } from "@material-tailwind/react"
import { ListBulletIcon } from "@heroicons/react/24/outline";
import OrderItems from "@/Components/OrderItems/OrderItems";

const TABLE_HEAD = ["#", "Items", "Total", "User", "Status", ""];

const Index = ({ orders }) => {
  const [viewing, setViewing] = useState(false)
  const [viewingOrder, setViewingOrder] = useState(null)

  const openModal = (order) => {
    setViewingOrder(order)
    setViewing(true)
  }

  const closeModal = () => {
    setViewingOrder(null)
    setViewing(false)
  }

  const updateOrder = (order, status) => {
    router.put(route('admin.orders.update', {
      order: order.id
    }), {
      status: status
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

  return (
    <AdminLayout>
      <Head title="Orders" />
      <div className="h-full w-full min-h-screen">
        <div className="flex w-fit gap-3 p-6">
          <Typography variant="h4">
            Orders
          </Typography>
        </div>
        <div className="lg:m-6 h-full">
          <Card className="overflow-scroll w-full">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  orders.map((order, index) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {order.id}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 font-normal text-sm text-blue-gray-900">
                          {order.items_count}
                          <IconButton variant="text" size="sm" onClick={() => openModal(order)}>
                            <ListBulletIcon className="h-6 w-6" />
                          </IconButton>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          P{order.total.toLocaleString('en-US')}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={`https://ui-avatars.com/api/?size=128&background=e3f2fd&name=${order.user.name}`}
                            alt={order.user.name + ' image'}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            variant="rounded"
                          />
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {order.user.name}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {order.status}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Select 
                          label="Status"
                          value={order.status}
                          onChange={e => updateOrder(order, e)}
                        >
                          <Option value="PENDING_PAYMENT">PENDING_PAYMENT</Option>
                          <Option value="PLACED">PLACED</Option>
                          <Option value="PREPARING">PREPARING</Option>
                          <Option value="DELIVERING">DELIVERING</Option>
                          <Option value="COMPLETE">COMPLETE</Option>
                          <Option value="FAILED">FAILED</Option>
                          <Option value="CANCELLED">CANCELLED</Option>
                        </Select>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <OrderItems viewing={viewing} closeModal={closeModal} order={viewingOrder} />
    </AdminLayout>
  )
}

export default Index
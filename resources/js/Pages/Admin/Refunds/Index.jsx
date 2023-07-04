import AdminLayout from "@/Layouts/AdminLayout"
import { Head } from "@inertiajs/react"
import { Avatar, Card, Typography, Select, Option } from "@material-tailwind/react"
import { router } from "@inertiajs/react";

const TABLE_HEAD = ["#", "Order #", "User", "Reason", "Status", ""];

const Index = ({ refunds }) => {
  const updateRefundStatus = (refund, status) => {
    router.put(route('admin.refunds.update', {
      refund: refund.id
    }), {
      status: status
    }, {
      preserveState: true,
      preserveScroll: true,
    })
  }

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
          <Card className="overflow-scroll lg:overflow-visible w-full">
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
                  refunds.map((refund, index) => (
                    <tr key={refund.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Typography variant="small" color="blue-gray" className="font-medium">
                            {refund.id}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3 font-normal text-sm text-blue-gray-900">
                          {refund.order_id}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={`https://ui-avatars.com/api/?size=128&background=e3f2fd&name=${refund.user.name}`}
                            alt={refund.user.name + ' image'}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {refund.user.name}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {refund.reason}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {refund.status}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Select 
                          label="Status"
                          value={refund.status}
                          onChange={e => updateRefundStatus(refund, e)}
                        >
                          <Option value="PENDING">PENDING</Option>
                          <Option value="COMPLETE">COMPLETE</Option>
                          <Option value="REJECTED">REJECTED</Option>
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
    </AdminLayout>
  )
}

export default Index
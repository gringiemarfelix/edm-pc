import AdminLayout from "@/Layouts/AdminLayout"
import { Head, Link } from "@inertiajs/react"
import { Avatar, Button, Card, Typography, } from "@material-tailwind/react"
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Name", "Brand", "Category", "Price", "Stock", "Sold",  ""];

const Index = ({ products }) => {
  return (
    <AdminLayout>
      <Head title="Products" />
      <div className="h-full w-full min-h-screen">
        <div className="flex w-fit gap-3 p-6">
          <Typography variant="h4">
            Products
          </Typography>
          <Link href={route('admin.products.create')}>
            <Button variant="gradient" className="flex items-center gap-3" size="sm">
              <PlusIcon className="h-5 w-5" />
              New
            </Button>
          </Link>
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
                  products.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={product?.image?.file}
                            alt={product?.name + ' image'}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            variant="rounded"
                          />
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {product.name}
                          </Typography>
                        </div>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {product.category.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {product.brand.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          P{product.price.toLocaleString('en-US')}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {product.stock}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {product.sold}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-3">
                          <Link 
                            href={route('admin.products.edit', {
                              product: product.id
                            })}
                          >
                            <Button color="teal" className="flex justify-center items-center gap-3" size="sm">
                              <PencilIcon className="h-5 w-5" />
                              Edit
                            </Button>
                          </Link>
                          <Link 
                            as="div" 
                            method="delete" 
                            href={route('admin.products.destroy', {
                              product: product.id
                            })}
                          >
                            <Button color="red" className="flex justify-center items-center gap-3" size="sm">
                              <TrashIcon className="h-5 w-5" />
                              Delete
                            </Button>
                          </Link>
                        </div>
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
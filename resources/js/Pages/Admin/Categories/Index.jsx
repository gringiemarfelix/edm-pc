import AdminLayout from "@/Layouts/AdminLayout"
import { Head, Link, router } from "@inertiajs/react"
import { Button, Card, Typography, Input } from "@material-tailwind/react"
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce"

const TABLE_HEAD = ["Name", "Products", ""];

const Index = ({ categories }) => {
  const [init, setInit] = useState(false)
  const [search, setSearch] = useState("")
  const [newSearch] = useDebounce(search, 250, {
    leading: true,
    trailing: true
  })

  useEffect(() => {
    if(init){
      router.get(route('admin.categories.index', {
        _query: {
          search: newSearch
        }
      }), {}, {
        preserveState: true
      })
    }else{
      setInit(true)
    }
  }, [newSearch])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <AdminLayout>
      <Head title="Categories" />
      <div className="h-full w-full">
        <div className="flex flex-col gap-3 p-6">
          <div className="flex w-fit gap-3">
            <Typography variant="h4">
              Categories
            </Typography>
            <Link href={route('admin.categories.create')}>
              <Button variant="gradient" className="flex items-center gap-3" size="sm">
                <PlusIcon className="h-5 w-5" />
                New
              </Button>
            </Link>
          </div>
          <div className="max-w-sm">
            <Input 
              label="Search" 
              icon={<MagnifyingGlassIcon />} 
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="lg:m-6">
          <Card className="overflow-scroll lg:overflow-visible h-full w-full">
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
                  categories.map((category, index) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {category.name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {category.products_count}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-3">
                          <Link 
                            href={route('admin.categories.edit', {
                              category: category.id
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
                            href={route('admin.categories.destroy', {
                              category: category.id
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
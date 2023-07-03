import { useForm } from "@inertiajs/react";
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react"
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const CategoryForm = ({ category }) => {
  const { data, setData, post, put, processing, errors, reset, progress, recentlySuccessful } = useForm({
    name: category?.name ?? "",
    slug: category?.slug ?? undefined,
  });

  const submit = (e) => {
    e.preventDefault()

    if(!category){
      post(route('admin.categories.store'))
    }else{
      put(route('admin.categories.update', {
        category: category.id
      }))
    }
  }

  return (
    <form className="min-w-[50%] max-w-xl" onSubmit={submit}>
      <Card>
        <CardHeader className="shadow-none p-6 m-0" floated={false}>
          <Typography variant="h6" color="blue-gray">
            {!category ? 'Create' : 'Edit'} Category
          </Typography>
          <Alert
            color="green"
            icon={
              <InformationCircleIcon
                strokeWidth={2}
                className="h-6 w-6"
              />
            }
            open={recentlySuccessful}
          >
            {!category ? 'Created successfully' : 'Updated successfully'}
          </Alert>
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
          <div>
            <Input
              type="text"
              label="Name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.name}
              </Typography>
            )}
          </div>
          <div>
            <Input
              type="text"
              label="Slug (Optional)"
              value={data.slug}
              onChange={(e) => setData("slug", e.target.value)}
            />
            {errors.slug && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.slug}
              </Typography>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button type="submit" variant="gradient" fullWidth>
            {!category ? 'Create' : 'Save'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default CategoryForm
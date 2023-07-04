import { useRef } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Typography, Textarea, Progress, IconButton, Avatar, Select, Option } from "@material-tailwind/react"
import { InformationCircleIcon, CloudArrowUpIcon, TrashIcon } from "@heroicons/react/24/solid";

const ProductForm = ({ product }) => {
  const { categories, brands } = usePage().props

  const imagesInput = useRef()

  const { data, setData, post, processing, errors, reset, progress, recentlySuccessful, transform } = useForm({
    category_id: product?.category_id.toString() ?? 0,
    brand_id: product?.brand_id.toString() ?? 0,
    name: product?.name ?? "",
    price: product?.price ?? "",
    stock: product?.stock ?? "",
    slug: product?.slug ?? undefined,
    description: product?.description ?? undefined,
    images: []
  });

  transform(data => ({
    ...data,
    category_id: parseInt(data.category_id),
    brand_id: parseInt(data.brand_id),
    price: parseFloat(data.price).toFixed(2)
  }))

  const submit = (e) => {
    e.preventDefault()

    if(!product){
      post(route('admin.products.store'))
    }else{
      post(route('admin.products.update', {
        product: product.id
      }))
    }
  }

  const handleLogoButton = () => {
    imagesInput.current.click()
  }

  return (
    <form className="min-w-[50%] max-w-xl" onSubmit={submit}>
      <Card>
        <CardHeader className="shadow-none p-6 m-0" floated={false}>
          <Typography variant="h6" color="blue-gray">
            {!product ? 'Create' : 'Edit'} product
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
            {!product ? 'Created successfully' : 'Updated successfully'}
          </Alert>
          {
            progress && (
              <Progress value={progress.percentage} size="lg" label=" " />
            )
          }
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
          <div className="w-full grid grid-cols-3 gap-3 p-6">
            {
              product?.images?.map(image =>
                <div className="flex flex-col items-center gap-3" key={image.id}>
                  <Avatar
                    src={image.file}
                    alt={image.product_id + ' image'}
                    size="xxl"
                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                    variant="rounded"
                  />
                  <Link 
                    as="div" 
                    method="delete" 
                    href={route('admin.products.images.destroy', {
                      product: product.id,
                      productImage: image.id
                    })}
                  >
                    <IconButton variant="text" color="red" size="sm">
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </Link>
                </div>
              )
            }
          </div>
          <div>
            <Select 
              size="lg" 
              label="Category"
              onChange={e => setData('category_id', e)}
              value={data.category_id}
            >
              {
                categories.map(category =>
                  <Option key={category.id} value={category.id.toString()}>{category.name}</Option>
                )
              }
            </Select>
            {errors.category_id && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.category_id}
              </Typography>
            )}
          </div>
          <div>
            <Select 
              size="lg" 
              label="Brand"
              onChange={e => setData('brand_id', e)}
              value={data.brand_id}
            >
              {
                brands.map(brand =>
                  <Option key={brand.id} value={brand.id.toString()}>{brand.name}</Option>
                )
              }
            </Select>
            {errors.brand_id && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.brand_id}
              </Typography>
            )}
          </div>
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
          <div>
            <Input
              type="text"
              label="Price"
              value={data.price}
              onChange={(e) => setData("price", e.target.value)}
            />
            {errors.price && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.price}
              </Typography>
            )}
          </div>
          <div>
            <Input
              type="text"
              label="Stock"
              value={data.stock}
              onChange={(e) => setData("stock", e.target.value)}
            />
            {errors.stock && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.stock}
              </Typography>
            )}
          </div>
          <div>
            <Textarea 
              label="Descripion" 
              value={data.description} 
              onChange={(e) => setData('description', e.target.value)} 
            />
            {errors.description && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.description}
              </Typography>
            )}
          </div>
          <div>
            <Button variant="gradient" className="flex items-center gap-3 w-fit" onClick={handleLogoButton}>
              <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload Images
            </Button>
            <input 
              type="file" 
              onChange={e => setData('images', e.target.files)} 
              accept="image/*"
              ref={imagesInput} 
              multiple
              hidden 
            />
            {errors.images && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.images}
              </Typography>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button type="submit" variant="gradient" fullWidth>
            {!product ? 'Create' : 'Save'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default ProductForm
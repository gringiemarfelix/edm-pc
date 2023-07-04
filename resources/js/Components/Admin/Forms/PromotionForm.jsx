import { useForm, usePage } from "@inertiajs/react";
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Typography, Progress, Select, Option } from "@material-tailwind/react"
import { CloudArrowUpIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

const PromotionForm = ({ promotion }) => {
  const { products } = usePage().props
  const imagesInput = useRef()

  const [preview, setPreview] = useState(null)
  const { data, setData, post, processing, errors, reset, progress, recentlySuccessful } = useForm({
    title: promotion?.title ?? "",
    description: promotion?.description ?? "",
    image: undefined
  });

  useEffect(() => {
    if(data.image != undefined){
      // create the preview
      const objectUrl = URL.createObjectURL(data.image)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
    }

    if(data.image == undefined && promotion){
      setPreview(promotion.image)
    }
  }, [data.image])

  const submit = (e) => {
    e.preventDefault()

    if(!promotion){
      post(route('admin.promotions.store'))
    }else{
      post(route('admin.promotions.update', {
        promotion: promotion.id
      }))
    }
  }

  const handleImagesButton = () => {
    imagesInput.current.click()
  }

  return (
    <form className="min-w-[50%] max-w-xl" onSubmit={submit}>
      <Card>
        <CardHeader className="shadow-none p-6 m-0" floated={false}>
          <Typography variant="h6" color="blue-gray">
            {!promotion ? 'Create' : 'Edit'} Promotion
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
            {!promotion ? 'Created successfully' : 'Updated successfully'}
          </Alert>
          {
            progress && (
              <Progress value={progress.percentage} size="lg" label=" " />
            )
          }
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
          <div className="w-full flex justify-center p-6">
            {
              preview &&
              <img
                src={preview}
                className="shadow rounded-lg max-w-xs"
              />
            }
          </div>
          <div>
            <Select 
              label="Product (Optional)"
              value={promotion?.product_id}
            >
              {
                products.map(product =>
                  <Option key={product.id} value={product.id.toString()}>{product.name}</Option>
                )
              }
            </Select>
          </div>
          <div>
            <Input
              type="text"
              label="Title"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
            />
            {errors.title && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.title}
              </Typography>
            )}
          </div>
          <div>
            <Input
              type="text"
              label="Description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
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
            <Button variant="gradient" className="flex items-center gap-3 w-fit" onClick={handleImagesButton}>
              <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload Image
            </Button>
            <input 
              type="file" 
              onChange={e => setData('image', e.target.files[0])} 
              accept="image/*"
              ref={imagesInput} 
              hidden 
            />
            {errors.image && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.image}
              </Typography>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button type="submit" variant="gradient" fullWidth>
            {!promotion ? 'Create' : 'Save'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default PromotionForm
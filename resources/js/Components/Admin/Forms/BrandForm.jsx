import { useRef, useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react"
import { InformationCircleIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";

const BrandForm = ({ brand }) => {
  const logoInput = useRef()

  const [preview, setPreview] = useState(null)
  const { data, setData, post, put, processing, errors, reset, progress, recentlySuccessful } = useForm({
    name: brand?.name ?? "",
    slug: brand?.slug ?? undefined,
    logo: undefined
  });

  useEffect(() => {
    if(data.logo != undefined){
      // create the preview
      const objectUrl = URL.createObjectURL(data.logo)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
    }

    if(data.logo == undefined && brand){
      setPreview(brand.logo)
    }
  }, [data.logo])

  const submit = (e) => {
    e.preventDefault()

    if(!brand){
      post(route('admin.brands.store'))
    }else{
      post(route('admin.brands.update', {
        brand: brand.id
      }))
    }
  }

  const handleLogoButton = () => {
    logoInput.current.click()
  }

  return (
    <form className="min-w-[50%] max-w-xl" onSubmit={submit}>
      <Card>
        <CardHeader className="shadow-none p-6 m-0" floated={false}>
          <Typography variant="h6" color="blue-gray">
            {!brand ? 'Create' : 'Edit'} Brand
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
            {!brand ? 'Created successfully' : 'Updated successfully'}
          </Alert>
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
            <Button variant="gradient" className="flex items-center gap-3 w-fit" onClick={handleLogoButton}>
              <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload Logo
            </Button>
            <input 
              type="file" 
              onChange={e => setData('logo', e.target.files[0])} 
              accept="image/*"
              ref={logoInput} 
              hidden 
            />
            {errors.logo && (
              <Typography
                variant="small"
                color="red"
                className="flex items-center gap-1 font-normal"
              >
                {errors.logo}
              </Typography>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button type="submit" variant="gradient" fullWidth>
            {!brand ? 'Create' : 'Save'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default BrandForm
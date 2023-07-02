import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

const Promotion = ({ promotion }) => {
  return (
    <Card>
      <CardHeader color="blue-gray" className="relative h-56 shadow" floated={false}>
        <img src={promotion.image ?? 'https://placehold.co/600x400'} alt="Promo" layout="fill" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {promotion.title}
        </Typography>
        <Typography>
          {promotion.description}
        </Typography>
      </CardBody>
      <CardFooter className="flex gap-3">
        <Link 
          href={route('admin.promotions.edit', {
            promotion: promotion.id
          })}
          className="w-full"
        >
          <Button color="teal" className="flex justify-center items-center gap-3" fullWidth>
            <PencilIcon className="h-5 w-5" />
            Edit
          </Button>
        </Link>
        <Link 
          as="div" 
          method="delete" 
          href={route('admin.promotions.destroy', {
            promotion: promotion.id
          })}
        >
          <Button color="red" className="flex justify-center items-center gap-3">
            <TrashIcon className="h-5 w-5" />
            Delete
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default Promotion
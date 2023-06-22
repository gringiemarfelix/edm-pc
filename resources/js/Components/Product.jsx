import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Rating,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "@inertiajs/react";
import {
  StarIcon as OutlineStarIcon,
  HeartIcon as OutlineHeartIcon
} from "@heroicons/react/24/outline";
import {
  StarIcon,
  HeartIcon
} from "@heroicons/react/24/solid";

const Product = ({ product }) => {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg">
      <Link href="#product">
        <CardHeader shadow={false} floated={false} className="mt-2 mx-2 lg:mt-4 lg:mx-4 h-48">
          <img 
            src={product.image?.file ?? "https://placehold.co/600x400"}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </CardHeader>
      </Link>
      <CardBody className="p-3 lg:p-6">
        <Link href="#test">
          <Typography variant="small" color="blue-gray" className="text-gray-700">
            {product.brand.name}
          </Typography>
        </Link>
        <Link href="#product">
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium truncate">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              P{product.price}
            </Typography>
          </div>
          <div className="flex items-center gap-1">
            <Rating 
              value={4} 
              ratedIcon={<StarIcon className="w-4 h-4 cursor-default"/>}
              unratedIcon={<OutlineStarIcon className="w-4 h-4 cursor-default" />}
              readonly 
            />
            <Typography color="blue-gray" className="font-medium text-sm">
              4.0 <span className="text-gray-500 text-xs align-middle">(2)</span>
            </Typography>
          </div>
          <Typography variant="small" color="blue-gray" className="text-gray-700 text-xs">
            0 sold
          </Typography>
        </Link>
      </CardBody>
      <CardFooter className="p-3 flex space-x-1 pt-0 lg:p-6">
        <Link href="#add" className="grow">
          <Button
            ripple={false}
            fullWidth={false}
            color="gray"
            className="bg-blue-gray-900/10 text-blue-gray-900 w-full shadow-none transition-all duration-50 hover:shadow hover:scale-105 focus:shadow focus:scale-105 active:scale-100"
          >
            Add to Cart
          </Button>
        </Link>
        <Link href="#wish">
          <IconButton variant="gradient" className="group transition-transform duration-300 active:scale-125">
            <OutlineHeartIcon className="w-6 h-6 transition-all duration-300 fill-transparent group-hover:fill-white" />
          </IconButton>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default Product
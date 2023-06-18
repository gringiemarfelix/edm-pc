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

const Product = () => {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg">
      <Link href="#product">
        <CardHeader shadow={false} floated={false} className="h-48">
          <img 
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80" 
            className="w-full h-full object-cover object-center"
          />
        </CardHeader>
      </Link>
      <CardBody>
        <Link href="#test">
          <Typography variant="small" color="blue-gray" className="text-gray-700">
            Apple
          </Typography>
        </Link>
        <Link href="#product">
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium truncate">
              Apple AirPods with long product title and some other things
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              P95.00
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
      <CardFooter className="flex space-x-1 pt-0">
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
          <IconButton variant="gradient" className="group transition-opacity duration-1000">
            <OutlineHeartIcon className="w-6 h-6 group-hover:hidden" />
            <HeartIcon className="w-6 h-6 hidden group-hover:block group-hover:opacity-100" />
          </IconButton>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default Product
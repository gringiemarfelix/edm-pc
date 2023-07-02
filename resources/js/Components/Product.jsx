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
import { Link, usePage } from "@inertiajs/react";
import {
  StarIcon as OutlineStarIcon,
  HeartIcon as OutlineHeartIcon
} from "@heroicons/react/24/outline";
import {
  StarIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ product }) => {
  const { auth } = usePage().props

  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg">
      <Link href={route('products.show', { product: product.id })}>
        <CardHeader shadow={false} floated={false} className="mt-2 mx-2 lg:mt-4 lg:mx-4 h-48">
          <img 
            src={product.image?.file ?? "https://placehold.co/600x400"}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </CardHeader>
      </Link>
      <CardBody className="p-3 lg:p-6">
        <Link href={route('brands.show', { brand: product.brand.slug })}>
          <Typography variant="small" color="blue-gray" className="text-gray-700">
            {product.brand.name}
          </Typography>
        </Link>
        <Link href={route('products.show', { product: product.id })}>
          <div className="flex flex-col">
            <Typography color="blue-gray" className="font-medium truncate">
              {product.name}
            </Typography>
            <Typography variant="small" color="blue" className="font-medium">
              P{product.price.toLocaleString('en-US')}
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
        <Link 
          as="div"
          method="post"
          href={route('cart.store', {
            product: product.id
          })} 
          className="grow"
          onSuccess={(page) => {
            toast.success(`Added ${product.name} to cart`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            })
          }}
          onError={errors => {
            toast.error(errors.product_id, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            })
          }}
          preserveScroll={auth.user}
        >
          <Button
            ripple={false}
            fullWidth={false}
            color="gray"
            className="bg-blue-gray-900/10 text-blue-gray-900 w-full shadow-none transition-all duration-50 hover:shadow hover:scale-105 focus:shadow focus:scale-105 active:scale-100"
            disabled={product.stock == 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Link>
        <Link 
          as="div"
          method={!product.wishlisted ? 'post' : 'delete'}
          href={route('wishlist.store', {
            product: product.id
          })} 
          onSuccess={(page) => {
            const message = !product.wishlisted ? 
              `Added ${product.name} to wishlist`
              :
              `Removed ${product.name} from wishlist`

            toast.success(message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            })
          }}
          onError={errors => {
            toast.error(errors.product_id, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "colored",
            })
          }}
          preserveScroll={auth.user}
        >
          <IconButton variant="gradient" color="red" className="group transition-transform duration-50 hover:shadow hover:scale-110 focus:shadow focus:scale-110 active:scale-125">
            <OutlineHeartIcon 
              className={`w-6 h-6 transition-all duration-300 fill-transparent 
                ${!product.wishlisted ? 'group-hover:fill-white' : 'fill-white group-hover:fill-transparent'}
              `}
            />
          </IconButton>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default Product
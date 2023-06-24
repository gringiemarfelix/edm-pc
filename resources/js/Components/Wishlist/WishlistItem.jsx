import { IconButton, Typography } from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const WishlistItem = ({ item }) => {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-3">
        <img
          className="w-24 h-24 rounded-lg shadow shadow-blue-gray-900/50"
          src={item.product.image ?? 'https://placehold.co/600x600'}
          alt={item.product.name}
        />
        <div className="flex flex-col w-full">
          <Typography variant="paragraph" color="blue-gray" className="font-normal">
            {item.product.name}
          </Typography>
          <div className="flex space-x-3 items-center mt-6">
            <Link
              as="a" 
              method="post" 
              href={route('cart.store', {
                product: item.product.id
              })}
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
              preserveScroll
            >
              <IconButton size="sm" variant="gradient" color="blue">
                <ShoppingCartIcon className="h-6 w-6" />
              </IconButton>
            </Link>
            <div className="w-px min-h-[1em] self-stretch bg-gray-200"></div>
            <Link
              as="a" 
              method="delete" 
              href={route('wishlist.destroy', {
                product: item.product.id
              })}
              onSuccess={(page) => {
                toast.success(`Removed ${product.name} from wishlist`, {
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
                toast.error('Failed to remove from wishlist', {
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
              preserveScroll
              // className="pl-3 border-l"
            >
              <IconButton size="sm" variant="gradient" color="red">
                <TrashIcon className="h-6 w-6" />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WishlistItem
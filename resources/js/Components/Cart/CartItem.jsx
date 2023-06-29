import { IconButton, Typography } from "@material-tailwind/react";
import {
  PlusIcon,
  MinusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const CartItem = ({ item }) => {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-3">
        <img
          className="w-24 h-24 rounded-lg shadow shadow-blue-gray-900/50 shrink-0"
          src={item.product.image.file == "" ? 'https://placehold.co/600x600' : ''}
          alt="nature image"
        />
        <div className="flex flex-col w-full">
          <Typography variant="paragraph" color="blue-gray" className="font-normal">
            {item.product.name}
          </Typography>
          <div className="flex space-x-3 items-center mt-6">
            <div className="relative w-fit">
              <div className="flex items-center space-x-3 w-fit border p-1 rounded-xl">
                <Link
                  as="a" 
                  method="put" 
                  href={route('cart.update', {
                    cart: item.id
                  })}
                  data={{
                    action: 'increment'
                  }}
                  onClick={e => {
                    if(item.quantity == item.product.stock){
                      e.preventDefault()
                    }
                  }}
                >
                  <IconButton size="sm" variant="gradient" className="h-6 w-6" disabled={item.quantity == item.product.stock}>
                    <PlusIcon className="h-4 w-4" />
                  </IconButton>
                </Link>
                <Typography variant="h6" color="blue-gray" className="font-normal">
                  {item.quantity}
                </Typography>
                <Link
                  as="a" 
                  method="put" 
                  href={route('cart.update', {
                    cart: item.id
                  })}
                  data={{
                    action: 'decrement'
                  }}
                  onClick={e => {
                    if(item.quantity == 1){
                      e.preventDefault()
                    }
                  }}
                >
                  <IconButton size="sm" variant="gradient" className="h-6 w-6" disabled={item.quantity == 1}>
                    <MinusIcon className="h-4 w-4" />
                  </IconButton>
                </Link>
              </div>
              {
                item.quantity == item.product.stock &&
                <Typography variant="small" color="gray" className="absolute left-0 right-0 ml-auto mr-auto text-xs text-center mt-1">
                  Max: { item.product.stock }
                </Typography>
              }
            </div>
            <div className="w-px min-h-[1em] self-stretch bg-gray-200"></div>
            <Link
              as="a" 
              method="delete" 
              href={route('cart.destroy', {
                cart: item.id
              })}
            >
              <IconButton size="sm" variant="gradient" className="h-6 w-6" color="red">
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
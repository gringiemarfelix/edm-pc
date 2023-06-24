import { IconButton, Typography } from "@material-tailwind/react";
import {
  ShoppingCartIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import WishlistItem from "./WishlistItem";

const TABLE_HEAD = ["Product", "Price", ""];

const WishlistItems = ({ items }) => {
  return (
    <div>
      <table className="hidden lg:table w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th 
                key={head} 
                className={`border-b border-blue-50 p-6
                  ${index == 0 && 'rounded-s-lg'}
                  ${index == TABLE_HEAD.length - 1 && 'rounded-e-lg text-right'}
                `}
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            items.map(({ id, product }, index) => {
              const isLast = index === items.length - 1;
              const classes = isLast ? "p-6" : "p-6 border-b border-blue-gray-50";

              return (
                <tr className="transition-colors duration-150 hover:bg-gray-100" key={id}>
                  <td className={classes + ' flex items-center space-x-3'}>
                    <img
                      className="w-24 h-24 rounded-lg shadow shadow-blue-gray-900/50"
                      src={product.image ?? 'https://placehold.co/600x600'}
                      alt="nature image"
                    />
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      {product.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {product.price}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="float-right flex space-x-3 items-center">
                      <Link
                        as="a" 
                        method="post" 
                        href={route('cart.store', {
                          product: product.id
                        })}
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
                          product: product.id
                        })}
                      >
                        <IconButton size="sm" variant="gradient" color="red">
                          <TrashIcon className="h-6 w-6" />
                        </IconButton>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className="flex flex-col space-y-6 lg:hidden">
        {
          items.map(item =>
            <WishlistItem item={item} />
          )
        }
      </div>
    </div>
  )
}

export default WishlistItems
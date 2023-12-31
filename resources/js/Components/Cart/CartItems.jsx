import { IconButton, Typography } from "@material-tailwind/react";
import {
  PlusIcon,
  MinusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import CartItem from "./CartItem";
import { useState } from "react";
import { useEffect } from "react";

const TABLE_HEAD = ["Product", "Price", "Quantity"];

const CartItems = ({ items, delivery }) => {
  const { subtotal } = usePage().props
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(subtotal + delivery)
  }, [subtotal, delivery])

  return (
    <div>
      <table className="hidden lg:table w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th 
                key={head} 
                className={`border-b border-blue-50 p-4
                  ${index == 0 && 'rounded-s-lg'}
                  ${index == 1 && 'text-end'}
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
            items.map(({ id, product, quantity }, index) => {
              const isLast = index === items.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr className="transition-colors duration-150 hover:bg-gray-100" key={id}>
                  <td className={classes + ' flex items-center space-x-3'}>
                    <img
                      className="w-24 h-24 rounded-lg shadow shadow-blue-gray-900/50"
                      src={product.image.file == "" ? 'https://placehold.co/600x600' : null}
                      alt="nature image"
                    />
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      {product.name}
                    </Typography>
                  </td>
                  <td className={classes + ' text-end'}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      P{product.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="float-right flex space-x-3 items-center">
                      <div className="relative">
                        <div className="flex items-center space-x-3 w-fit border p-1 rounded-xl">
                          <Link
                            as="a" 
                            method="put" 
                            href={route('cart.update', {
                              cart: id
                            })}
                            data={{
                              action: 'increment'
                            }}
                            onClick={e => {
                              if(quantity == product.stock){
                                e.preventDefault()
                              }
                            }}
                          >
                            <IconButton size="sm" variant="gradient" className="h-6 w-6" disabled={quantity == product.stock}>
                              <PlusIcon className="h-4 w-4" />
                            </IconButton>
                          </Link>
                          <Typography variant="h6" color="blue-gray" className="font-normal">
                            {quantity}
                          </Typography>
                          <Link
                            as="a" 
                            method="put" 
                            href={route('cart.update', {
                              cart: id
                            })}
                            data={{
                              action: 'decrement'
                            }}
                            onClick={e => {
                              if(quantity == 1){
                                e.preventDefault()
                              }
                            }}
                          >
                            <IconButton size="sm" variant="gradient" className="h-6 w-6" disabled={quantity == 1}>
                              <MinusIcon className="h-4 w-4" />
                            </IconButton>
                          </Link>
                        </div>
                        {
                          quantity == product.stock &&
                          <Typography variant="small" color="gray" className="absolute left-0 right-0 ml-auto mr-auto text-xs text-center mt-1">
                            Max: { product.stock }
                          </Typography>
                        }
                      </div>
                      <div className="w-px min-h-[1em] self-stretch bg-gray-200"></div>
                      <Link
                        as="div" 
                        method="delete" 
                        href={route('cart.destroy', {
                          cart: id
                        })}
                      >
                        <IconButton size="sm" variant="gradient" className="h-6 w-6" color="red">
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="text-end">
              <span className="font-medium text-blue-gray-900 text-sm">
                Subtotal: <span className="font-normal">P{subtotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2} className="text-end">
              <span className="font-medium text-blue-gray-900 text-sm">
                Delivery: <span className="font-normal">P{delivery.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={2} className="text-end">
              <span className="font-bold text-blue-gray-900 text-sm">
                Total: <span className="font-normal">P{total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </span>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className="flex flex-col space-y-6 lg:hidden">
        {
          items.map(item =>
            <CartItem key={item.id} item={item} />
          )
        }
        <div>
          <Typography variant="h6" color="blue-gray" className="font-medium">
            Subtotal: <span className="font-normal">P{subtotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </Typography>
          <hr className="my-1"/>
          <Typography variant="h6" color="blue-gray">
            Delivery: <span className="font-normal">P{delivery.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </Typography>
          <Typography variant="h6" color="blue-gray">
            Total: <span className="font-normal">P{total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default CartItems
import { IconButton, Typography } from "@material-tailwind/react";
import { TruckIcon, BanknotesIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import OrderItems from "../OrderItems/OrderItems";
import Order from "./Order";

const TABLE_HEAD = ["Date", "Status", "Items", "Total"];

const Orders = ({ orders }) => {
  const [viewing, setViewing] = useState(false)
  const [viewingOrder, setViewingOrder] = useState(null)

  const openModal = (order) => {
    setViewingOrder(order)
    setViewing(true)
  }

  const closeModal = () => {
    setViewingOrder(null)
    setViewing(false)
  }

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
            orders.map((order, index) => {
              const isLast = index === orders.length - 1;
              const classes = isLast ? "p-6" : "p-6 border-b border-blue-gray-50";

              return (
                <tr className="transition-colors duration-150 hover:bg-gray-100" key={order.id}>
                  <td className={classes + ' flex items-center space-x-3'}>
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      {order.created_at}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {parseOrderStatus(order)}
                  </td>
                  <td className={classes + ' flex items-center gap-1'}>
                    {order.items_count}
                    <IconButton variant="text" size="sm" onClick={() => openModal(order)}>
                      <ListBulletIcon className="h-6 w-6" />
                    </IconButton>
                  </td>
                  <td className={classes + ' text-end'}>
                    P{(order.total + order.delivery_fee).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <div className="flex flex-col divide-y lg:hidden">
        {
          orders.map(order =>
            <Order key={order.id} order={order} />
          )
        }
      </div>

      <OrderItems viewing={viewing} closeModal={closeModal} order={viewingOrder} />

    </div>
  )
}

const parseOrderStatus = (order) => {
  let parsed = '';
  switch(order.status){
    case 'PENDING_PAYMENT':
      parsed = (
        <div className="flex items-center gap-1">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Pending Payment
          </Typography>
          <a 
            href={order.payment.url}
            target="_blank"
          >
            <IconButton variant="text" color="green" size="sm">
              <BanknotesIcon className="h-6 w-6" />
            </IconButton>
          </a>
        </div>
      )
      break;
    case 'PLACED':
      parsed = (
        <Typography variant="small" color="blue-gray" className="font-normal">
          Order Placed
        </Typography>
      )
      break;
    case 'PREPARING':
      parsed = (
        <Typography variant="small" color="blue-gray" className="font-normal">
          Preparing Order
        </Typography>
      )
      break;
    case 'DELIVERING':
      parsed = (
        <div className="flex items-center gap-1">
          <Typography variant="small" color="blue-gray" className="font-normal">
            On the way
          </Typography>
          {
            order.delivery == 'lalamove' &&
            <a 
              href={order.lalamove.share_link}
              target="_blank"
            >
              <IconButton variant="text" color="orange" size="sm">
                <TruckIcon className="h-6 w-6" />
              </IconButton>
            </a>
          }
        </div>
      )
      break;
    case 'COMPLETE':
      parsed = (
        <Typography variant="small" color="blue-gray" className="font-normal">
          Preparing Order
        </Typography>
      )
      break;
    case 'FAILED':
      parsed = (
        <Typography variant="small" color="blue-gray" className="font-normal text-red-500">
          Failed
        </Typography>
      )
      break;
    case 'CANCELLED':
      parsed = (
        <Typography variant="small" color="blue-gray" className="font-normal text-orange-900">
          Cancelled
        </Typography>
      )
      break;
    default:
      parsed = (
        <Typography variant="small" color="blue-gray" className="font-normal">
          Unknown
        </Typography>
      )
  }

  return parsed
}

export default Orders
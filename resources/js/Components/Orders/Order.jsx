import { IconButton, Typography } from "@material-tailwind/react"
import { TruckIcon, BanknotesIcon } from "@heroicons/react/24/outline";

import OrderItems from "../OrderItems/OrderItems";
import { useState } from "react";

const Order = ({ order }) => {
  const [viewing, setViewing] = useState(false)

  const openModal = () => setViewing(true)
  const closeModal = () => setViewing(false)

  return (
    <div className="flex flex-col py-3">
      <div className="flex space-x-3">
        <div className="flex flex-col w-full gap-1">
          <div className="flex items-center justify-between">
            <Typography variant="paragraph" color="blue-gray" className="font-normal">
              {order.created_at}
            </Typography>
            <Typography variant="small" color="blue" className="font-normal" onClick={openModal}>
              View Items
            </Typography>
          </div>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Status: {parseOrderStatus(order)}
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Items: <span className="font-normal">{order.items_count}</span>
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Total: <span className="font-normal">P{(order.total + order.delivery_fee).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </Typography>
        </div>
      </div>
      <OrderItems viewing={viewing} closeModal={closeModal} order={order} />
    </div>
  )
}

const parseOrderStatus = (order) => {
  let parsed = '';
  switch(order.status){
    case 'PENDING_PAYMENT':
      parsed = (
        <div className="flex items-center gap-1">
          <span className="font-normal">
            Pending Payment
          </span>
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
        <span className="font-normal">
          Order Placed
        </span>
      )
      break;
    case 'PREPARING':
      parsed = (
        <span className="font-normal">
          Preparing Order
        </span>
      )
      break;
    case 'DELIVERING':
      parsed = (
        <div className="flex items-center gap-1">
          <span className="font-normal">
            On the way
          </span>
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
        <span className="font-normal">
          Complete
        </span>
      )
      break;
    case 'FAILED':
      parsed = (
        <span className="font-normal text-red-500">
          Failed
        </span>
      )
      break;
    case 'CANCELLED':
      parsed = (
        <span className="font-normal text-orange-900">
          Cancelled
        </span>
      )
      break;
    default:
      parsed = (
        <Typography variant="small" color="purple" className="font-normal">
          Unknown
        </Typography>
      )
  }

  return parsed
}

export default Order
import { Typography } from "@material-tailwind/react"
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
            Status: <span className="font-normal">{parseOrderStatus(order.status)}</span>
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Items: <span className="font-normal">{order.items_count}</span>
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Total: <span className="font-normal">{(order.total + order.delivery_fee).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </Typography>
        </div>
      </div>
      <OrderItems viewing={viewing} closeModal={closeModal} order={order} />
    </div>
  )
}

const parseOrderStatus = (status) => {
  let parsed = '';
  switch(status){
    case 'PENDING_PAYMENT':
      parsed = 'Pending Payment'
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

export default Order
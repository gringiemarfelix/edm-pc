import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  Spinner,
  Button,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import ReviewForm from "../Forms/ReviewForm";

const TABLE_HEAD = ["Product", "Quantity", "Price", "Total"];

const OrderItems = ({ viewing, closeModal, order }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [reviewing, setReviewing] = useState({
    product: null,
    open: false
  })

  useEffect(() => {
    if(!viewing && !order){
      setItems([])
    }
  }, [viewing, order])

  useEffect(() => {
    if(order){
      fetchItems()
    }
  }, [order])

  useEffect(() => {
    if(order){
      fetchItems()
    }
  }, [])

  const fetchItems = async () => {
    setLoading(true)

    await axios.get(route('orders.items', {
      order: order.id
    }))
    .then(({ data }) => {
      setItems(data)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const openReview = (product) => {
    setReviewing({
      product: product,
      open: true
    })
  }

  const closeReview = () => {
    setReviewing({
      product: null,
      open: false
    })
  }

  return (
    <Dialog open={viewing} handler={closeModal} size="md">
      <DialogHeader>
        Items of Order #{order?.id}
      </DialogHeader>
      <DialogBody>
        {
          (!loading && order) ?
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
                items.map((item, index) => {
                  const isLast = index === items.length - 1;
                  const classes = isLast ? "p-6" : "p-6 border-b border-blue-gray-50";

                  return (
                    <tr className="transition-colors duration-150 hover:bg-gray-100" key={item.id}>
                      <td className={classes + ' flex items-center space-x-3'}>
                        <img
                          className="w-24 h-24 rounded-lg shadow shadow-blue-gray-900/50"
                          src={item.product.image.file == "" ? 'https://placehold.co/600x600' : null}
                          alt={item.product.name + ' image'}
                        />
                        <div>
                          <Typography variant="paragraph" color="blue-gray" className="font-normal">
                            {item.product.name}
                          </Typography>
                          {
                            order?.status === 'COMPLETE' &&
                            <Button variant="text" color="amber" size="sm" className="flex items-center gap-3 text-xs" onClick={() => openReview(item.product)}>
                              <StarIcon className="h-4 w-4" />
                              {item.product.reviews.length == 0 ? 'Review' : 'Reviewed'}
                            </Button>
                          }
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="paragraph" color="blue-gray" className="font-normal">
                          {item.quantity}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="paragraph" color="blue-gray" className="font-normal">
                          P{item.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                      </td>
                      <td className={classes + ' text-end'}>
                        <Typography variant="paragraph" color="blue-gray" className="font-normal">
                          P{item.total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-end">
                  <span className="font-medium text-blue-gray-900">
                    Subtotal: <span className="font-normal">P{order.total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={4} className="text-end">
                  <span className="font-medium text-blue-gray-900">
                    Delivery: <span className="font-normal">P{order.delivery_fee.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={4} className="text-end">
                  <span className="font-bold text-blue-gray-900">
                    Total: <span className="font-normal">P{(order.total + order.delivery_fee).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </span>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          :
          <div className="w-full h-full flex items-center justify-center">
            <Spinner className="w-24 h-24" />
          </div>
        }
        <div className="flex flex-col divide-y lg:hidden">
          {
            items.map(item =>
              <OrderItem key={item.id} item={item} status={order?.status} />
            )
          }
          {
            order &&
            <div className="flex flex-col justify-center items-end pt-6">
              <Typography variant="small" color="blue-gray" className="font-medium">
                Subtotal: <span className="font-normal">P{order.total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-medium">
                Delivery: <span className="font-normal">P{order.delivery_fee.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-medium">
                    Total: <span className="font-normal">P{(order.total + order.delivery_fee).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </Typography>
            </div>
          }
        </div>
        <ReviewForm reviewing={reviewing.open} closeModal={closeReview} product={reviewing.product} />
      </DialogBody>
    </Dialog>
  )
}

export default OrderItems
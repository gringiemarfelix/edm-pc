import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react"
import { StarIcon } from "@heroicons/react/24/solid";
import ReviewForm from "../Forms/ReviewForm";

const OrderItem = ({ item, status }) => {
  const [reviewing, setReviewing] = useState({
    product: null,
    open: false
  })

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
    <div className="flex flex-col py-3">
      <div className="flex space-x-3">
        <div>
          <img
            className="w-24 h-24 rounded-lg shadow shadow-blue-gray-900/50 shrink-0"
            src={item.product.image.file == "" ? 'https://placehold.co/600x600' : item.product.image.file}
            alt="nature image"
          />
          {
            status === 'COMPLETE' &&
            <Button variant="text" color="amber" size="sm" className="flex items-center gap-3 text-xs mt-3" onClick={() => openReview(item.product)}>
              <StarIcon className="h-4 w-4" />
              {item.product.reviews.length == 0 ? 'Review' : 'Reviewed'}
            </Button>
          }
        </div>
        <div className="flex flex-col w-full">
          <Typography variant="paragraph" color="blue-gray" className="font-normal mb-3">
            {item.product.name}
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Quantity: <span className="font-normal">{item.quantity}</span>
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-medium mb-3">
            Price: <span className="font-normal">P{item.price.toLocaleString()}</span>
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Total: <span className="font-normal">P{item.total.toLocaleString()}</span>
          </Typography>
        </div>
      </div>
      <ReviewForm reviewing={reviewing.open} closeModal={closeReview} product={reviewing.product} />
    </div>
  )
}

export default OrderItem
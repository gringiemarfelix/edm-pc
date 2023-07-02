import { Typography } from "@material-tailwind/react"

const OrderItem = ({ item }) => {
  return (
    <div className="flex flex-col py-3">
      <div className="flex space-x-3">
        <img
          className="w-24 h-24 rounded-lg shadow shadow-blue-gray-900/50 shrink-0"
          src={item.product.image.file == "" ? 'https://placehold.co/600x600' : ''}
          alt="nature image"
        />
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
    </div>
  )
}

export default OrderItem
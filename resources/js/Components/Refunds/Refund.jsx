import { Typography } from "@material-tailwind/react"

const Refund = ({ refund }) => {
  return (
    <div className="flex flex-col py-3">
      <div className="flex space-x-3">
        <div className="flex flex-col w-full gap-1">
          <div className="flex items-center justify-between">
            <Typography variant="paragraph" color="blue-gray" className="font-normal">
              {refund.created_at}
            </Typography>
          </div>
          <div className="font-medium text-sm text-blue-gray-900">
            Order #: <span className="font-normal">{refund.order_id}</span>
          </div>
          <div className="font-medium text-sm text-blue-gray-900">
            Status: {parseRefundStatus(refund.status)}
          </div>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Total: <span className="font-normal">P{refund.order.total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </Typography>
        </div>
      </div>
    </div>
  )
}

const parseRefundStatus = (status) => {
  let parsed = '';
  switch(status){
    case 'PENDING':
      parsed = (
        <Typography variant="small" color="amber" className="font-normal inline">
          Pending
        </Typography>
      )
      break;
    case 'COMPLETE':
      parsed = (
        <Typography variant="small" color="green" className="font-normal inline">
          Complete
        </Typography>
      )
      break;
    case 'REJECTED':
      parsed = (
        <Typography variant="small" color="red" className="font-normal inline">
          Failed
        </Typography>
      )
      break;
    default:
      parsed = (
        <Typography variant="small" color="purple" className="font-normal inline">
          Unknown
        </Typography>
      )
  }

  return parsed
}

export default Refund
import { Typography } from "@material-tailwind/react";
import Refund from "./Refund";

const TABLE_HEAD = ["Date", "Order #", "Total", "Status"];

const Refunds = ({ refunds }) => {
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
            refunds.map((refund, index) => {
              const isLast = index === refunds.length - 1;
              const classes = isLast ? "p-6" : "p-6 border-b border-blue-gray-50";

              return (
                <tr className="transition-colors duration-150 hover:bg-gray-100" key={refund.id}>
                  <td className={classes + ' flex items-center space-x-3'}>
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      {refund.created_at}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {refund.order_id}
                  </td>
                  <td className={classes + ' flex items-center gap-1'}>
                    P{refund.order.total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td className={classes + ' text-end'}>
                    {parseRefundStatus(refund.status)}
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <div className="flex flex-col divide-y lg:hidden">
        {
          refunds.map(refund =>
            <Refund key={refund.id} refund={refund} />
          )
        }
      </div>
    </div>
  )
}

const parseRefundStatus = (status) => {
  let parsed = '';
  switch(status){
    case 'PENDING':
      parsed = (
        <Typography variant="small" color="amber" className="font-normal">
          Pending
        </Typography>
      )
      break;
    case 'COMPLETE':
      parsed = (
        <Typography variant="small" color="green" className="font-normal">
          Complete
        </Typography>
      )
      break;
    case 'REJECTED':
      parsed = (
        <Typography variant="small" color="red" className="font-normal">
          Failed
        </Typography>
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

export default Refunds
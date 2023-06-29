import { IconButton, Typography } from "@material-tailwind/react";
import {
  HomeIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";

const TABLE_HEAD = ["Address", ""];

const AddressList = () => {
  const { auth } = usePage().props
  const addresses = auth.user.addresses

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
            addresses.map((address, index) => {
              const isLast = index === addresses.length - 1;
              const classes = isLast ? "p-6" : "p-6 border-b border-blue-gray-50";

              return (
                <tr className="transition-colors duration-150 hover:bg-gray-100" key={address.id}>
                  <td className={classes + ' flex items-center space-x-3'}>
                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                      {address.address}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="float-right flex space-x-3 items-center">
                      {
                        address.main == 0 &&
                        <>
                          <Link
                            as="a" 
                            method="patch" 
                            href={route('address.update', {
                              address: address.id
                            })}
                          >
                            <IconButton size="sm" variant="gradient" color="blue">
                              <HomeIcon className="h-6 w-6" />
                            </IconButton>
                          </Link>
                          <div className="w-px min-h-[1em] self-stretch bg-gray-200"></div>
                        </>
                      }
                      <Link
                        as="a" 
                        method="delete" 
                        href={route('address.destroy', {
                          address: address.id
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
          addresses.map(address =>
            // <WishlistItem key={item.id} item={item} />
            <div key={address.id}></div>
          )
        }
      </div>
    </div>
  )
}

export default AddressList
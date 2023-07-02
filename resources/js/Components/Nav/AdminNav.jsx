import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
  Navbar,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  TagIcon,
  Squares2X2Icon,
  TruckIcon,
  ReceiptRefundIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { useState } from "react";
 
const AdminNav = () => {
  const [open, setOpen] = useState(false)

  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  return (
    <>
      <div className="hidden lg:block fixed top-0 left-0 h-screen w-[20rem]">
        <Content />
      </div>
      <div className="block lg:hidden">
        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 rounded-none">
          <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
            <IconButton
              variant="text"
              className="mr-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </IconButton>
            <Typography
              className="py-1.5 font-medium"
            >
              EDM PC
            </Typography>
          </div>
        </Navbar>
        <Drawer open={open} onClose={closeDrawer}>
          <Content />
        </Drawer>
      </div>
    </>
  );
}

const Content = () => {
  return (
    <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          EDM PC - Admin
        </Typography>
      </div>
      <List>
        <Link href={route('admin.index')}>
          <ListItem className={route().current('admin.index') ? 'bg-blue-500 text-gray-50 hover:bg-blue-500 hover:text-gray-100 hover:bg-opacity-100 hover:saturate-150' : undefined}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link href={route('admin.categories.index')}>
          <ListItem className={route().current('admin.categories.*') ? 'bg-blue-500 text-gray-50 hover:bg-blue-500 hover:text-gray-100 hover:bg-opacity-100 hover:saturate-150' : undefined}>
            <ListItemPrefix>
              <TagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Categories
          </ListItem>
        </Link>
        <Link href={route('admin.brands.index')}>
          <ListItem className={route().current('admin.brands.*') ? 'bg-blue-500 text-gray-50 hover:bg-blue-500 hover:text-gray-100 hover:bg-opacity-100 hover:saturate-150' : undefined}>
            <ListItemPrefix>
              <Squares2X2Icon className="h-5 w-5" />
            </ListItemPrefix>
            Brands
          </ListItem>
        </Link>
        <Link href={route('admin.products.index')}>
          <ListItem className={route().current('admin.products.*') ? 'bg-blue-500 text-gray-50 hover:bg-blue-500 hover:text-gray-100 hover:bg-opacity-100 hover:saturate-150' : undefined}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Products
          </ListItem>
        </Link>
        <Link href={route('admin.orders.index')}>
          <ListItem className={route().current('admin.orders.*') ? 'bg-blue-500 text-gray-50 hover:bg-blue-500 hover:text-gray-100 hover:bg-opacity-100 hover:saturate-150' : undefined}>
            <ListItemPrefix>
              <TruckIcon className="h-5 w-5" />
            </ListItemPrefix>
            Orders
            <ListItemSuffix>
              <Chip value={14} size="sm" variant="ghost" color="blue" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link href={route('admin.refunds.index')}>
          <ListItem className={route().current('admin.refunds.*') ? 'bg-blue-500 text-gray-50 hover:bg-blue-500 hover:text-gray-100 hover:bg-opacity-100 hover:saturate-150' : undefined}>
            <ListItemPrefix>
              <ReceiptRefundIcon className="h-5 w-5" />
            </ListItemPrefix>
            Refunds
          </ListItem>
        </Link>
        {/* <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem> */}
        <Link method="post" href={route('logout')}>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </Link>
      </List>
    </Card>
  )
}

export default AdminNav
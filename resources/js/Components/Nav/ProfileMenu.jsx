import { useState, createElement } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  PowerIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
 
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    method: 'get',
    route: route('profile.index')
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    method: 'get',
    route: route('profile.edit')
  },
  {
    label: "Orders",
    icon: TruckIcon,
    method: 'get',
    route: route('profile.orders')
  },
  {
    label: "Help",
    icon: QuestionMarkCircleIcon,
    method: 'get',
    route: route('products.index')
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    method: 'post',
    route: route('logout')
  },
];
 
const ProfileMenu = () => {
  const { auth } = usePage().props
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {
            !auth.user?.photo ?
            <div className="rounded-full p-1 bg-blue-500 text-white shadow">
              <UserCircleIcon className="h-7 w-7" />
            </div>
            :
            <Avatar
              variant="circular"
              size="sm"
              alt="candice wu"
              className="border border-blue-500 p-0.5"
              src={'g'}
            />
          }
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, method, route }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {
                createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })
              }
              <Link
                href={route}
                method={method}
              >
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu
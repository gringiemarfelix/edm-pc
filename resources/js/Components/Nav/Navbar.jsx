import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  CubeIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { AiOutlineLaptop, AiOutlineDesktop } from "react-icons/ai"
import CpuIcon from "../Icons/CpuIcon";
import MotherboardIcon from "../Icons/MotherboardIcon";
import GpuIcon from "../Icons/GpuIcon";
import RamIcon from "../Icons/RamIcon";
import HardDriveIcon from "../Icons/HardDriveIcon";
import DisplayIcon from "../Icons/DisplayIcon";
import CaseIcon from "../Icons/CaseIcon";
import FanIcon from "../Icons/FanIcon";
 
const colors = {
  blue: "bg-blue-50 text-blue-500 fill-blue-500 stroke-blue-500",
  orange: "bg-orange-50 text-orange-500 fill-orange-500 stroke-orange-500",
  green: "bg-green-50 text-green-500 fill-green-500 stroke-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500 fill-blue-gray-500 stroke-blue-gray-500",
  purple: "bg-purple-50 text-purple-500 fill-purple-500 stroke-purple-500",
  teal: "bg-teal-50 text-teal-500 fill-teal-500 stroke-teal-500",
  cyan: "bg-cyan-50 text-cyan-500 fill-cyan-500 stroke-cyan-500",
  pink: "bg-pink-50 text-pink-500 fill-pink-500 stroke-pink-500",
};
 
const navListMenuItems = [
  {
    color: "blue",
    icon: CpuIcon,
    title: "CPU",
    description: "Central Processing Unit",
  },
  {
    color: "orange",
    icon: MotherboardIcon,
    title: "Motherboard",
    description: "Your machine's backbone for components.",
  },
  {
    color: "green",
    icon: GpuIcon,
    title: (
      <div className="flex items-center gap-1">
        GPU{" "}
        <Chip
          size="sm"
          color="light-green"
          variant="ghost"
          value="New Products"
          className="capitalize"
        />
      </div>
    ),
    description: "Graphics Processing Unit",
  },
  {
    color: "blue-gray",
    icon: RamIcon,
    title: "RAM",
    description: "Random Acceess Memory",
  },
  {
    color: "purple",
    icon: HardDriveIcon,
    title: "Storage",
    description: "Your data storage.",
  },
  {
    color: "teal",
    icon: DisplayIcon,
    title: "Display",
    description: "Your monitor of choice.",
  },
  {
    color: "cyan",
    icon: CaseIcon,
    title: "Case",
    description: "The housing for your components.",
  },
  {
    color: "pink",
    icon: FanIcon,
    title: "Fans",
    description: "Your cooling setup.",
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );
 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <CubeIcon className="h-[18px] w-[18px]" />
              Components
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
 
function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem 
          className="flex items-center gap-2 py-2 pr-4 
          data-[active=true]:bg-gradient-to-tr data-[active=true]:from-blue-600 data-[active=true]:to-blue-400
          data-[active=true]:text-white data-[active=true]:shadow
          " 
          data-active={route().current('products.index')}
        >
          <HomeIcon className="h-[18px] w-[18px]" />
          Home
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <AiOutlineLaptop />
          Laptops
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <AiOutlineDesktop />
          Desktops
        </ListItem>
      </Typography>
    </List>
  );
}
 
const TopNav = () => {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-full rounded-none px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer flex items-center py-1.5 lg:ml-2"
        >
          <CpuChipIcon className="h-6 w-6 mr-1" />
          EDM PC
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button variant="text" size="sm" color="blue-gray">
            Sign In
          </Button>
          <Button variant="gradient" size="sm">
            Sign Up
          </Button>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
            Sign In
          </Button>
          <Button variant="gradient" size="sm" fullWidth>
            Sign Up
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default TopNav
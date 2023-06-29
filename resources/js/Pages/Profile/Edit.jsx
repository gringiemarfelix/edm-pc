import { useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react"
import Layout from "@/Layouts/Layout"
import { Card, CardBody, Tabs, TabsHeader, Tab, TabsBody, TabPanel, Avatar, Button, Typography } from "@material-tailwind/react"
import {
  UserCircleIcon,
  Cog6ToothIcon,
  TruckIcon,
  LockClosedIcon,
  ReceiptRefundIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
import UpdateProfileInformation from "./Partials/UpdateProfileInformation";
import UpdatePassword from "./Partials/UpdatePassword";
import DeleteUser from "./Partials/DeleteUser";
import TwoFactor from "./Partials/TwoFactor";
import AddAddress from "@/Components/Forms/AddAddress";
import AddressList from "@/Components/AddressList";

const Edit = () => {
  const { auth, active } = usePage().props
  const navbarHeight = document.getElementById('navbar')?.offsetHeight

  const [isMobile, setIsMobile] = useState(false)
  const [addingAddress, setAddingAddress] = useState(false)

  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  
  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const openAddressModal = () => setAddingAddress(true)
  const closeAddressModal = () => setAddingAddress(false)

  return (
    <Layout>
      <Head title="Edit Profile" />
      <div
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
      >
        <Tabs value={active ?? 'profile'} orientation={!isMobile ? 'vertical' : 'horizontal'} className="flex flex-col lg:flex-row justify-center w-full lg:w-3/4 gap-3 py-6">
          <Card>
            <CardBody className="p-0">
              <TabsHeader 
                className="flex-row flex-nowrap lg:flex-col overflow-x-scroll lg:overflow-x-auto sticky top-0 bg-transparent p-3" 
                indicatorProps={{
                  className: 'bg-gradient-to-tr from-blue-600 to-blue-400'
                }}
              >
                <Tab value="profile" className="whitespace-nowrap px-6 py-2 transition-all duration-500 lg:place-items-start lg:pl-4 lg:pr-16" activeClassName="font-medium text-gray-50">
                  <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6" />
                    Profile
                  </div>
                </Tab>
                <Tab value="edit" className="whitespace-nowrap px-6 py-2 transition-all duration-500 lg:place-items-start lg:pl-4 lg:pr-16" activeClassName="font-medium text-gray-50">
                  <div className="flex items-center gap-2">
                    <Cog6ToothIcon className="h-6 w-6"/>
                    Edit Profile
                  </div>
                </Tab>
                <Tab value="security" className="whitespace-nowrap px-6 py-2 transition-all duration-500 lg:place-items-start lg:pl-4 lg:pr-16" activeClassName="font-medium text-gray-50">
                  <div className="flex items-center gap-2">
                    <LockClosedIcon className="h-6 w-6" />
                    Security
                  </div>
                </Tab>
                <Tab value="address" className="whitespace-nowrap px-6 py-2 transition-all duration-500 lg:place-items-start lg:pl-4 lg:pr-16" activeClassName="font-medium text-gray-50">
                  <div className="flex items-center gap-2">
                    <HomeIcon className="h-6 w-6"/>
                    Address
                  </div>
                </Tab>
                <Tab value="orders" className="whitespace-nowrap px-6 py-2 transition-all duration-500 lg:place-items-start lg:pl-4 lg:pr-16" activeClassName="font-medium text-gray-50">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="h-6 w-6" />
                    Orders
                  </div>
                </Tab>
                <Tab value="refunds" className="whitespace-nowrap px-6 py-2 transition-all duration-500 lg:place-items-start lg:pl-4 lg:pr-16" activeClassName="font-medium text-gray-50">
                  <div className="flex items-center gap-2">
                    <ReceiptRefundIcon className="h-6 w-6" />
                    Refunds
                  </div>
                </Tab>
              </TabsHeader>
            </CardBody>
          </Card>
          <Card className="grow">
            <CardBody className="flex flex-col lg:flex-row justify-between pb-0 gap-3">
              <TabsBody>
                <TabPanel value="profile" className="py-2 text-blue-gray-900">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar 
                      src={auth.user.photo ?? `https://ui-avatars.com/api/?size=128&background=e3f2fd&name=${auth.user.name}`}
                      alt={`${auth.user.name} Photo`}
                      className="shadow"
                      size="lg"
                      withBorder
                    />
                    <div className="self-stretch">
                      <Typography variant="h6" color="blue-gray">
                        {auth.user.name}
                      </Typography>
                      <Typography variant="small" color="gray">
                        +63{auth.user.phone}
                      </Typography>
                      <Typography variant="small" color="gray">
                        {auth.user.email}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="h5" color="blue-gray">
                    Main Address
                  </Typography>
                  <Typography variant="paragraph" color="blue-gray" className="flex items-center gap-1">
                    <HomeIcon className="h-5 w-5 text-blue-500" strokeWidth={2.5}/>
                    Test adress teatgadkgjadkgjadl
                  </Typography>
                </TabPanel>
                <TabPanel value="edit" className="py-2 text-blue-gray-900">
                  <UpdateProfileInformation />
                  <hr className="my-6 max-w-xl" />
                  <DeleteUser />
                </TabPanel>
                <TabPanel value="security" className="py-2 text-blue-gray-900">
                  <UpdatePassword />
                  <hr className="my-6 max-w-xl" />
                  <TwoFactor />
                </TabPanel>
                <TabPanel value="address" className="py-2 text-blue-gray-900">
                  <AddressList />
                  <Button variant="gradient" color="blue" onClick={openAddressModal} className="my-6">
                    Add Address
                  </Button>
                  <AddAddress addingAddress={addingAddress} closeModal={closeAddressModal} />
                </TabPanel>
                <TabPanel value="orders" className="py-2 text-blue-gray-900">
                  Orders
                </TabPanel>
                <TabPanel value="refunds" className="py-2 text-blue-gray-900">
                  Refunds
                </TabPanel>
              </TabsBody>
            </CardBody>
          </Card>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Edit
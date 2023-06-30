import CartItems from "@/Components/Cart/CartItems"
import Layout from "@/Layouts/Layout"
import { Head, Link, usePage, useForm } from "@inertiajs/react"
import { Alert, Button, Card, CardBody, CardFooter, Radio, Typography, Select, Option, Spinner, Popover, PopoverHandler, PopoverContent, IconButton } from "@material-tailwind/react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import axios from "axios"

const Index = () => {
  const { auth, items, default_address, ships_from, errors } = usePage().props
  const navbarHeight = document.getElementById('navbar')?.offsetHeight

  const [estimating, setEstimating] = useState(false)
  const [estimations, setEstimations] = useState({
    motorcycle: 0,
    car: 0,
    breakdowns: {
      car: {},
      motorcycle: {}
    }
  })
  const [deliveryFee, setDeliveryFee] = useState(100.00)
  const { data, setData, post, processing, reset } = useForm({
    address: default_address.address ?? (auth.user.addresses.length ? auth.user.addresses[0].address : ""),
    delivery: "lalamove",
    pay: "links",
    lalamove: 'motorcycle'
  });

  useEffect(() => {
    if(data.address != ""){
      setEstimating(true)
      getQuotation()
    }
  }, [data.address])

  useEffect(() => {
    if(data.delivery == 'lalamove' && !estimating){
      if(data.lalamove == 'car'){
        setDeliveryFee(parseFloat(estimations.car))
      }else{
        setDeliveryFee(parseFloat(estimations.motorcycle))
      }
    }else{
      setDeliveryFee(100.00)
    }
  }, [data.delivery, data.lalamove, estimating])

  const submit = (e) => {
    e.preventDefault();
    return
    post(route("cart.checkout"), {
      onSuccess: () => {
        toast.success('Address added successfully.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        })
      }
    })
  };

  const getQuotation = async () => {
    const find = auth.user.addresses.find(item => item.address == data.address)

    await axios.get(route('cart.lalamove'), {
      params: {
        address_id: find.id
      }
    })
    .then(({ data }) => 
      setEstimations({
        motorcycle: data.motorcycle.priceBreakdown.total,
        car: data.car.priceBreakdown.total,
        breakdowns: {
          car: data.car.priceBreakdown,
          motorcycle: data.motorcycle.priceBreakdown
        }
      })
    )
    .finally(() => setEstimating(false))
  }

  return (
    <Layout>
      <Head title="Cart" />
      <form
        style={{
          minHeight: `calc(90vh - ${navbarHeight}px)`
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
        onSubmit={submit}
      >
        <Card className="w-full lg:w-3/4">
          <CardBody>
            <Typography color="blue-gray" variant="h4">Cart</Typography>
            {
              Object.keys(errors).length > 0 &&
              <div>
                <Alert
                  variant="gradient"
                  color="red"
                  icon={
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />
                  }
                  className="mb-3"
                >
                  {
                    Object.entries(errors).map(([key, value]) => 
                      <p>{value}</p>
                    )
                  }
                </Alert>
                <div className="flex flex-col gap-3">
                  {
                    errors.phone &&
                    <Link href={route('profile.edit')} className="w-fit">
                      <Button variant="gradient" color="amber">
                        Add Phone Number
                      </Button>
                    </Link>
                  }
                  {
                    errors.address &&
                    <Link href={route('profile.address')} className="w-fit">
                      <Button variant="gradient" color="amber">
                        Add Address
                      </Button>
                    </Link>
                  }
                </div>
              </div>
            }
            <div className="my-3">
              {
                items.length ?
                <CartItems items={items} delivery={deliveryFee} />
                :
                <Typography color="gray" variant="h6" className="p-6 text-center">
                  Your cart is empty.
                </Typography>
              }
            </div>
          </CardBody>
          {
            items.length > 0 &&
            <>
              <hr className="shadow" />
              <CardFooter>
                <Typography color="blue-gray" variant="h6">Ships from:</Typography>
                <Typography color="gray" variant="small" className="mb-3">{ships_from}</Typography>
                
                <Typography color="blue-gray" variant="h6" className="mb-3">Address:</Typography>
                {
                  auth.user.addresses.length > 0 ?
                  <Select 
                    label="Select Address"
                    containerProps={{
                      className: 'max-w-xl mb-3'
                    }}
                    onChange={e => setData('address', e)}
                    value={data.address}
                  >
                    {
                      auth.user.addresses.map((address, index) =>
                        <Option key={address.id} value={address.address}>{address.address}</Option>
                      )
                    }
                  </Select>
                  :
                  <Typography variant="paragraph" color="red">
                    You do not have any address in your account.
                  </Typography>
                }

                <Typography color="blue-gray" variant="h6">Delivery:</Typography>
                <div className="flex flex-col gap-1 mb-3">
                  <RadioWrapper active={data.delivery === 'lalamove'}>
                    <Radio 
                      name="delivery"
                      id="delivery-lalamove"
                      label={
                        <div>
                          <Typography color="blue-gray" className="font-medium">Express via <span className="text-orange-500">Lalamove</span></Typography>
                          <Typography variant="small" color="gray" className="font-normal">
                            Fee: {estimating && 'Estimating...'}
                          </Typography>
                          {
                            estimating &&
                            <Spinner className="h-12 w-12" />
                          }
                        </div>
                      }
                      containerProps={{
                        className: "-mt-5"
                      }}
                      checked={data.delivery === 'lalamove'}
                      onChange={() => setData('delivery', 'lalamove')}
                    />
                    {
                      !estimating && 
                      <div className="flex flex-col ml-6 my-3">
                        <Radio 
                          name="lalamove"
                          id="lalamove-motorcycle"
                          label={
                            <div>
                              {`Motorcycle: P${parseFloat(estimations.motorcycle).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                              <DeliveryBreakdownPopover breakdown={estimations.breakdowns.motorcycle} />
                            </div>
                          }
                          checked={data.lalamove === 'motorcycle'}
                          onChange={() => setData('lalamove', 'motorcycle')}
                        />
                        <Radio 
                          name="lalamove"
                          id="lalamove-car"
                          label={
                            <div>
                              {`Car: P${parseFloat(estimations.car).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                              <DeliveryBreakdownPopover breakdown={estimations.breakdowns.car} />
                            </div>
                          }
                          checked={data.lalamove === 'car'}
                          onChange={() => setData('lalamove', 'car')}
                        />
                      </div>
                    }
                  </RadioWrapper>
                  <RadioWrapper active={data.delivery === 'standard'}>
                    <Radio 
                      name="delivery"
                      id="delivery-standard"
                      label={
                        <div>
                          <Typography color="blue-gray" className="font-medium">Standard</Typography>
                          <Typography variant="small" color="gray" className="font-normal">
                            Fee: P100.00
                          </Typography>
                        </div>
                      }
                      containerProps={{
                        className: "-mt-5"
                      }}
                      checked={data.delivery === 'standard'}
                      onChange={() => setData('delivery', 'standard')}
                    />
                  </RadioWrapper>
                </div>

                <Typography color="blue-gray" variant="h6">Pay via:</Typography>
                <div className="flex flex-col gap-1 mb-3">
                  <RadioWrapper active={data.pay === 'links'}>
                    <Radio 
                      name="payment"
                      id="payment-links"
                      label={
                        <div>
                          <Typography color="blue-gray" className="font-medium">Links</Typography>
                          <Typography variant="small" color="gray" className="font-normal">
                            includes <span className="text-blue-500">Checkout</span> + Over-The-Counter options.
                          </Typography>
                        </div>
                      }
                      containerProps={{
                        className: "-mt-5"
                      }}
                      checked={data.pay === 'links'}
                      onChange={() => setData('pay', 'links')}
                    />
                  </RadioWrapper>
                  <RadioWrapper active={data.pay === 'checkout'}>
                    <Radio 
                      name="payment"
                      id="payment-checkout"
                      label={
                        <div>
                          <Typography color="blue-gray" className="font-medium">Checkout</Typography>
                          <Typography variant="small" color="gray" className="font-normal">
                            includes Cards, E-Wallets, Online Banks and BillEase.
                          </Typography>
                        </div>
                      }
                      containerProps={{
                        className: "-mt-5"
                      }}
                      checked={data.pay === 'checkout'}
                      onChange={() => setData('pay', 'checkout')}
                    />
                  </RadioWrapper>
                </div>

                <Button type="submit" variant="gradient" color="blue">
                  Checkout
                </Button>
              </CardFooter>
            </>
          }
        </Card>
      </form>
    </Layout>
  )
}

const RadioWrapper = ({ active = false, children }) => {
  return (
    <div className={`py-3 pl-3 pr-6 transition-all duration-300 w-fit ${active && 'shadow-md rounded-lg'}`}>
      {children}
    </div>
  )
}

const DeliveryBreakdownPopover = ({ breakdown }) => {
  return (
    <Popover
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      placement="right"
    >
      <PopoverHandler>
        <IconButton variant="text" color="orange" size="sm" className="ml-1">
          <InformationCircleIcon className="h-6 w-6" />
        </IconButton>
      </PopoverHandler>
      <PopoverContent>
        <Typography variant="h6" color="blue-gray">Base: <span className="font-normal">P{parseFloat(breakdown.base).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></Typography>
        <Typography variant="h6" color="blue-gray">Distance: <span className="font-normal">P{parseFloat(breakdown.extraMileage).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></Typography>
        <Typography variant="h6" color="blue-gray">Total: <span className="font-normal">P{parseFloat(breakdown.total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></Typography>
      </PopoverContent>
    </Popover>
  )
}

export default Index
import CartItems from "@/Components/Cart/CartItems"
import Layout from "@/Layouts/Layout"
import { Head, usePage } from "@inertiajs/react"
import { Button, Card, CardBody, CardFooter, Radio, Typography } from "@material-tailwind/react"
import { useState } from "react"

const Index = () => {
  const { items } = usePage().props
  const navbarHeight = document.getElementById('navbar')?.offsetHeight
  const [delivery, setDelivery] = useState('lalamove')
  const [pay, setPay] = useState('links')

  return (
    <Layout>
      <Head title="Cart" />
      <div
        style={{
          minHeight: `calc(90vh - ${navbarHeight}px)`
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
      >
        <Card className="w-full lg:w-3/4">
          <CardBody>
            <Typography color="blue-gray" variant="h4">Cart</Typography>
            <div className="my-3">
              {
                items.length ?
                <CartItems items={items} />
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
                <Typography color="blue-gray" variant="h6">Delivery:</Typography>
                <div className="flex flex-col gap-1 mb-3">
                  <Radio 
                    name="delivery"
                    id="delivery-lalamove"
                    label={
                      <div>
                        <Typography color="blue-gray" className="font-medium">Express via <span className="text-orange-500">Lalamove</span></Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                          Fee: P200.00
                        </Typography>
                      </div>
                    }
                    containerProps={{
                      className: "-mt-5"
                    }}
                    checked={delivery === 'lalamove'}
                    onChange={() => setDelivery('lalamove')}
                  />
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
                    checked={delivery === 'standard'}
                    onChange={() => setDelivery('standard')}
                  />
                </div>
                <Typography color="blue-gray" variant="h6">Pay via:</Typography>
                <div className="flex flex-col gap-1 mb-3">
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
                    checked={pay === 'links'}
                    onChange={() => setPay('links')}
                  />
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
                    checked={pay === 'checkout'}
                    onChange={() => setPay('checkout')}
                  />
                </div>
                <Button>
                  Checkout
                </Button>
              </CardFooter>
            </>
          }
        </Card>
      </div>
    </Layout>
  )
}

export default Index
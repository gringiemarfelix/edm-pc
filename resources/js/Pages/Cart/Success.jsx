import CheckoutSuccess from '@/Components/Graphics/CheckoutSuccess'
import Layout from '@/Layouts/Layout'
import { Head, Link } from '@inertiajs/react'
import { Button, Card, CardBody } from '@material-tailwind/react'
import React from 'react'

const Success = () => {
  const navbarHeight = document.getElementById('navbar')?.offsetHeight

  return (
    <Layout>
      <Head title='Checkout Success' />
      <div
        style={{
          minHeight: `calc(90vh - ${navbarHeight}px)`
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
      >
        <Card>
          <CardBody>
            <CheckoutSuccess className="h-[36rem] w-[36rem] drop-shadow-md" />
            <Link href={route('profile.orders')}>
              <Button variant='gradient' fullWidth>
                Track Order
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </Layout>
  )
}

export default Success
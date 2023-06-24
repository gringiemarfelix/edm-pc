import WishlistItems from "@/Components/Wishlist/WishlistItems"
import Layout from "@/Layouts/Layout"
import { Head, Link, usePage } from "@inertiajs/react"
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const { items } = usePage().props
  const navbarHeight = document.getElementById('navbar')?.offsetHeight

  return (
    <Layout>
      <Head title="Wishlist" />
      <div
        style={{
          minHeight: `calc(90vh - ${navbarHeight}px)`
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
      >
        <Card className="w-full lg:w-3/4">
          <CardBody>
            <Typography color="blue-gray" variant="h4">Wishlist</Typography>
            <div className="my-3">
              {
                items.length ?
                <WishlistItems items={items} />
                :
                <Typography color="gray" variant="h6" className="p-6 text-center">
                  Your wishlist is empty.
                </Typography>
              }
            </div>
          </CardBody>
          {
            items.length > 0 &&
            <>
              <hr className="shadow" />
              <CardFooter>
                <Link
                  method="post"
                  href={route('wishlist.storeAll')}
                  onSuccess={(page) => {
                    toast.success(page.props.flash.message, {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: "colored",
                    })
                  }}
                  onError={errors => {
                    toast.error('Failed to add all to cart', {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: "colored",
                    })
                  }}
                  preserveScroll
                >
                  <Button variant="gradient">
                    Add All to Cart
                  </Button>
                </Link>
              </CardFooter>
            </>
          }
        </Card>
      </div>
    </Layout>
  )
}

export default Index
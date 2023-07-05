import { createPortal } from "react-dom";
import { Head, Link, usePage } from "@inertiajs/react"
import Layout from "@/Layouts/Layout"
import { Card, CardBody, Breadcrumbs, Carousel, Typography, Rating, Button, IconButton, 
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel, 
} from "@material-tailwind/react"
import { ChevronRightIcon, ShoppingCartIcon, HeartIcon, StarIcon as StarIconOutline, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Product from "@/Components/Product";
import { FacebookMessengerShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import Review from "@/Components/Review";

const Show = () => {
  const { auth, product, similar } = usePage().props
  const images = product.images.map(image => image.file)
  const navbarHeight = document.getElementById('navbar')?.offsetHeight

  const [isMobile, setIsMobile] = useState(false)

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
  }, [])

  return (
    <Layout>
      <Head title={product.name} />
      <div
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
      >
        <div className="flex flex-col space-y-3 w-full lg:w-3/4">
          <Card>
            <CardBody className="p-3 overflow-x-scroll lg:overflow-auto">
              <Breadcrumbs 
                className="bg-transparent" 
                separator={
                  <ChevronRightIcon className="w-4 h-4 text-blue-gray-500" strokeWidth={2.5} />
                } 
              >
                <Link 
                  href={route('products.search')}
                  className="opacity-60"
                >
                  Products
                </Link>
                <Link 
                  href={route('categories.show', {
                    category: product.category.slug
                  })}
                  className="opacity-60"
                >
                  {product.category.name}
                </Link>
                <Link 
                  href={route('brands.show', {
                    brand: product.brand.slug
                  })}
                  className="opacity-60"
                >
                  {product.brand.name}
                </Link>
                <Link 
                  href={route('products.show', {
                    product: product.slug
                  })}
                >
                  {product.name}
                </Link>
              </Breadcrumbs>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col gap-4" id="carouselContainer">
                <Carousel
                  className="rounded-xl max-w-sm shadow-md"
                  navigation={({ ...props }) => (
                    <CarouselNavigation 
                      images={images} 
                      {...props} 
                    />
                  )}
                  loop
                >
                  {
                    images.map((image, index) =>
                      <img
                        key={index}
                        src={!image ? "https://placehold.co/600x400" : image}
                        alt="image 1"
                        className="h-full w-full object-cover"
                      />
                    )
                  }
                </Carousel>
              </div>
              <div className="grow">
                <Link 
                  href={route('brands.show', {
                    brand: product.brand.slug
                  })}
                >
                  <Typography variant="paragraph" color="gray" className="leading-tight">
                    {product.brand.name}
                  </Typography>
                </Link>
                <Typography variant="h3" color="blue-gray" className="leading-tight mb-1">
                  {product.name}
                </Typography>
                <div className="flex items-center mb-1">
                  <Rating value={product.rating ? parseInt(product.rating) : 0} readonly />
                  <small className="text-blue-gray-900 font-medium text-sm ml-1">
                    {product.rating ? parseFloat(product.rating).toFixed(1) : 0} <span className="text-gray-500 text-xs">({product.rating_count})</span>
                  </small>
                </div>
                <Typography variant="small" color="gray" className="font-medium mb-3">
                  {product.sold} sold
                </Typography>
                <Typography variant="paragraph" color={product.stock !== 0 ? 'green' : 'red'}>
                  {product.stock !== 0 ? 'Available' : 'Out of Stock'}
                </Typography>
                <hr className="my-3" />  
                <Typography variant="h3" color="blue">
                  P{product.price.toLocaleString('en-US')}
                </Typography>
                <div className="flex gap-3 my-3">
                  <Link 
                    as="div"
                    method="post"
                    href={route('cart.store', {
                      product: product.id
                    })} 
                    onSuccess={(page) => {
                      toast.success(`Added ${product.name} to cart`, {
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
                      toast.error(errors.product_id, {
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
                    preserveScroll={auth.user}
                  >
                    <Button
                      variant="gradient"
                      color="blue"
                      className="flex items-center gap-3"
                      disabled={product.stock == 0}
                    >
                      <ShoppingCartIcon className="h-6 w-6" />
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </Link>
                  <Link 
                    as="div"
                    method={!product.wishlisted ? 'post' : 'delete'}
                    href={route('wishlist.store', {
                      product: product.id
                    })} 
                    onSuccess={(page) => {
                      const message = !product.wishlisted ? 
                        `Added ${product.name} to wishlist`
                        :
                        `Removed ${product.name} from wishlist`

                      toast.success(message, {
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
                      toast.error(errors.product_id, {
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
                    preserveScroll={auth.user}
                  >
                    <Button variant="gradient" color="red" className="group transition-transform duration-300 active:scale-125 flex items-center gap-3">
                      <HeartIcon 
                        className={`w-6 h-6 transition-all duration-300 fill-transparent 
                          ${!product.wishlisted ? 'group-hover:fill-white' : 'fill-white group-hover:fill-transparent'}
                        `}
                      />
                      { !product.wishlisted ? 'Add to Wishlist' : 'Remove from Wishlist' }
                    </Button>
                  </Link>
                </div>
                <div className="my-3">
                  <Typography variant="h6" color="blue-gray">Share</Typography>
                  <div className="flex gap-3">
                    <FacebookShareButton 
                      url={route('products.show', { product: product.id })}
                    >
                      <div className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] overflow-hidden"><span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"><svg className="h-6 w-6 rounded fill-gray-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg></span></div>
                    </FacebookShareButton>
                    <FacebookMessengerShareButton 
                      url={route('products.show', { product: product.id })}
                    >
                      <div className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-gradient-to-tr from-light-blue-600 to-light-blue-400 text-white shadow-md shadow-light-blue-500/20 hover:shadow-lg hover:shadow-light-blue-500/40 active:opacity-[0.85] overflow-hidden"><span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"><svg className="h-6 w-6 rounded fill-gray-100" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z"></path></svg></span></div>
                    </FacebookMessengerShareButton>
                    <TwitterShareButton 
                      url={route('products.show', { product: product.id })}
                    >
                      <div className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] overflow-hidden"><span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"><svg className="h-6 w-6 rounded fill-gray-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></span></div>
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            </CardBody>
            <hr className="mx-6" />
            <CardBody>
              <Tabs value="overview" orientation={!isMobile ? 'vertical' : 'horizontal'} className="flex-col lg:flex-row">
                <TabsHeader 
                  className="flex-row lg:flex-col lg:w-40 shadow-inner sticky top-0" 
                  indicatorProps={{
                    className: 'bg-gradient-to-tr from-blue-600 to-blue-400'
                  }}
                >
                  <Tab value="overview" className="transition-all duration-500" activeClassName="font-medium text-gray-50">
                    Overview
                  </Tab>
                  <Tab value="description" className="transition-all duration-500" activeClassName="font-medium text-gray-50">
                    Specifications
                  </Tab>
                  <Tab value="reviews" className="transition-all duration-500" activeClassName="font-medium text-gray-50">
                    Reviews
                  </Tab>
                </TabsHeader>
                <TabsBody className="bg-blue-gray-50 shadow-inner rounded-lg my-3 lg:ml-3 lg:my-0">
                  <TabPanel value="overview" className="py-2 text-blue-gray-900">
                    <Typography variant="paragraph" color="blue-gray" className="whitespace-pre-wrap">
                      { product.overview }
                    </Typography>
                  </TabPanel>
                  <TabPanel value="description" className="py-2 text-blue-gray-900">
                    <Typography variant="paragraph" color="blue-gray" className="whitespace-pre-wrap">
                      { product.description }
                    </Typography>
                  </TabPanel>
                  <TabPanel value="reviews" className="py-2 text-blue-gray-900 flex flex-col lg:flex-row gap-3">
                    <Card>
                      <CardBody className="flex flex-col gap-3">
                        <Link
                          href={route('products.show', {
                            product: product.slug,
                            filter: 'date'
                          })}
                          preserveState
                          preserveScroll
                        >
                          <Button 
                            variant="text" 
                            color="blue-gray" 
                            className={`hover:shadow-md hover:bg-transparent text-blue-gray-900
                              ${route().params?.filter == 'date' ? 'shadow-md border' : 'border border-transparent'}
                            `}
                            fullWidth
                          >
                            <div className="flex items-center gap-3">
                              <CalendarDaysIcon className="h-6 w-6" />
                              <Typography variant="h6" className="-mb-1 text-inherit font-medium">
                                Date
                              </Typography>
                            </div>
                          </Button>
                        </Link>
                        <Link
                          href={route('products.show', {
                            product: product.slug,
                            filter: '5'
                          })}
                          preserveState
                          preserveScroll
                        >
                          <Button 
                            variant="text" 
                            color="blue-gray" 
                            className={`hover:shadow-md hover:bg-transparent 
                              ${route().params?.filter == '5' ? 'shadow-md border' : 'border border-transparent'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Typography variant="h6" color="blue-gray" className="-mb-1">
                                5
                              </Typography>
                              <div className="flex text-amber-500">
                                {getStars(5).map(star => star)}
                              </div>
                            </div>
                          </Button>
                        </Link>
                        <Link
                          href={route('products.show', {
                            product: product.slug,
                            filter: '4'
                          })}
                          preserveState
                          preserveScroll
                        >
                          <Button 
                            variant="text" 
                            color="blue-gray" 
                            className={`hover:shadow-md hover:bg-transparent 
                              ${route().params?.filter == '4' ? 'shadow-md border' : 'border border-transparent'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Typography variant="h6" color="blue-gray" className="-mb-1">
                                4
                              </Typography>
                              <div className="flex text-amber-500">
                                {getStars(4).map(star => star)}
                              </div>
                            </div>
                          </Button>
                        </Link>
                        <Link
                          href={route('products.show', {
                            product: product.slug,
                            filter: '3'
                          })}
                          preserveState
                          preserveScroll
                        >
                          <Button 
                            variant="text" 
                            color="blue-gray" 
                            className={`hover:shadow-md hover:bg-transparent 
                              ${route().params?.filter == '3' ? 'shadow-md border' : 'border border-transparent'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Typography variant="h6" color="blue-gray" className="-mb-1">
                                3
                              </Typography>
                              <div className="flex text-amber-500">
                                {getStars(3).map(star => star)}
                              </div>
                            </div>
                          </Button>
                        </Link>
                        <Link
                          href={route('products.show', {
                            product: product.slug,
                            filter: '2'
                          })}
                          preserveState
                          preserveScroll
                        >
                          <Button 
                            variant="text" 
                            color="blue-gray" 
                            className={`hover:shadow-md hover:bg-transparent 
                              ${route().params?.filter == '2' ? 'shadow-md border' : 'border border-transparent'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Typography variant="h6" color="blue-gray" className="-mb-1">
                                2
                              </Typography>
                              <div className="flex text-amber-500">
                                {getStars(2).map(star => star)}
                              </div>
                            </div>
                          </Button>
                        </Link>
                        <Link
                          href={route('products.show', {
                            product: product.slug,
                            filter: '1'
                          })}
                          preserveState
                          preserveScroll
                        >
                          <Button 
                            variant="text" 
                            color="blue-gray" 
                            className={`hover:shadow-md hover:bg-transparent 
                              ${route().params?.filter == '1' ? 'shadow-md border' : 'border border-transparent'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <Typography variant="h6" color="blue-gray" className="-mb-1">
                                1
                              </Typography>
                              <div className="flex text-amber-500">
                                {getStars(1).map(star => star)}
                              </div>
                            </div>
                          </Button>
                        </Link>
                      </CardBody>
                    </Card>
                    <Card className="lg:grow">
                      <CardBody className="flex flex-col gap-3">
                        {
                          product.reviews.map(review =>
                            <Review review={review} />
                          )
                        }
                      </CardBody>
                    </Card>
                  </TabPanel>
                </TabsBody>
              </Tabs>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-3 lg:p-6">
              <Typography variant="h5" color="blue-gray">Similar Items</Typography>
              <div className="grid grid-cols-2 gap-1 lg:gap-3 lg:grid-cols-6">
                {
                  similar.map(product =>
                    <Product key={product.id} product={product} />
                  )
                }
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

const CarouselNavigation = ({ setActiveIndex, activeIndex, length, images }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if(!ready){
      setReady(true)
    }
  }, [ready])

  useEffect(() => {
    const container = document.getElementById('imageContainer')
    const active = document.getElementById(`image-${activeIndex}`)

    if(ready){
      container.scrollTo({
        left: (active.offsetLeft + (active.offsetWidth / 2)) - (container.offsetWidth / 2),
        behavior: 'smooth'
      })
    }
  }, [activeIndex])

  return !ready ? null : createPortal(
    <div className="flex gap-2 overflow-hidden max-w-sm py-3" id="imageContainer">
      {new Array(length).fill("").map((_, i) => (
        <img
          key={i}
          id={`image-${i}`}
          src={images[i] ?? `https://placehold.co/600x400`}
          className={`cursor-pointer transition-all duration-300 max-w-[10rem] rounded
            ${activeIndex === i ? "bg-white opacity-100 shadow" : "bg-white/50 opacity-75"}
          `}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </div>
  , document.getElementById('carouselContainer'));
}

const getStars = (rating) => {
  const stars = []

  for (let index = 1; index <= 5; index++) {
    if(index <= rating){
      stars.push(<StarIcon className="h-5 w-5" />)
    }else{
      stars.push(<StarIconOutline className="h-5 w-5" />)
    }
  }

  return stars
}

export default Show
import { Link, router, usePage } from "@inertiajs/react";
import { Carousel, Typography, Button } from "@material-tailwind/react";

const CustomCarousel = () => {
  const { promotions } = usePage().props

  return (
    <Carousel 
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-2 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "bg-white shadow-lg shadow-blue-500 w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      autoplayDelay={3000} 
      autoplay 
      loop
    >
      {
        promotions.map((promotion, index) =>
          <div className="relative h-full w-full">
            <img
              src={promotion.image}
              alt={promotion.title + ' image'}
              className="h-full w-full object-cover"
              loading={(index == 0 || index == 1) ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 grid h-full w-full items-end bg-gradient-to-t from-black/75 via-black/30 via-black/15 to-transparent">
              <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  {promotion.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-12 opacity-80"
                >
                  {promotion.description}
                </Typography>
                {
                  promotion?.product?.slug &&
                  <div className="flex gap-2">
                    <Link
                      as="div"
                      href={route('cart.store', {
                        product: promotion?.product?.slug
                      })}
                      method="post"
                      onSuccess={() => {
                        router.visit(route('cart.index'))
                      }}
                    >
                      <Button size="lg" color="blue">
                        Buy Now
                      </Button>
                    </Link>
                    <Link 
                      href={route('products.show', {
                        product: promotion?.product?.slug
                      })}
                    >
                      <Button size="lg" color="white" variant="text">
                        Details
                      </Button>
                    </Link>
                  </div>
                }
              </div>
            </div>
          </div>
        )
      }
    </Carousel>
  );
}
 
export default CustomCarousel
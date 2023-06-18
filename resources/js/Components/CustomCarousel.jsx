import { Carousel, Typography, Button } from "@material-tailwind/react";
const CustomCarousel = () => {
  return (
    <Carousel autoplayDelay={3000} autoplay loop>
      <div className="relative h-full w-full">
        <img
          // src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="EDM PC Build"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-gradient-to-t from-black/75 via-black/30 via-black/15 to-transparent">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              EDM PC - Extreme Build
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Built for gaming and productivity.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="blue">
                Buy Now
              </Button>
              <Button size="lg" color="white" variant="text">
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1626958390943-a70309376444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Keyboard"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-gradient-to-t from-black/75 via-black/30 via-black/15 to-transparent">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Gaming Keyboard
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Gain some edge over your rivals.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="blue">
                Buy Now
              </Button>
              <Button size="lg" color="white" variant="text">
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1555617778-02518510b9fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="MoBo"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-gradient-to-t from-black/75 via-black/30 via-black/15 to-transparent">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Gaming Motherboard
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Obtain the power to overclock.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="blue">
                Buy Now
              </Button>
              <Button size="lg" color="white" variant="text">
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
 
export default CustomCarousel
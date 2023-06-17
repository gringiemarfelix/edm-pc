import CustomCarousel from "@/Components/CustomCarousel"
import Layout from "@/Layouts/Layout"
import { Head } from "@inertiajs/react"
import { Typography } from "@material-tailwind/react"

const Index = () => {
  const navbarHeight = document.getElementById('navbar')?.offsetHeight

  return (
    <Layout>
      <Head title="Home" />
      <div
        style={{
          height: `calc(90vh - ${navbarHeight}px)`
        }}
      >
        <CustomCarousel />
      </div>
      <div className="bg-gradient-to-br from-blue-500 to to-blue-700 h-24">
        Test
      </div>
      <Typography variant="h1" className="text-center my-3">New Products</Typography>
      <Typography variant="h1" className="text-center my-3">Top-Rated Products</Typography>
      <Typography variant="h1" className="text-center my-3">Top-Selling Products</Typography>
    </Layout>
  )
}

export default Index
import CustomCarousel from "@/Components/CustomCarousel"
import Layout from "@/Layouts/Layout"
import { Head } from "@inertiajs/react"

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
    </Layout>
  )
}

export default Index
import Footer from "@/Components/Footer"
import TopNav from "@/Components/Nav/Navbar"

const Layout = ({ children }) => {
  const navbarHeight = document.getElementById('navbar')?.offsetHeight
  const footerHeight = document.getElementById('footer')?.offsetHeight
  
  return (
    <div className="bg-gray-50">
      <TopNav />
      <div 
        style={{
          minHeight: `calc(100vh - (${navbarHeight}px + ${footerHeight}px))`
        }}
      >
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default Layout
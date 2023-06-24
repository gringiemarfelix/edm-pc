import Footer from "@/Components/Footer"
import TopNav from "@/Components/Nav/Navbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        pauseOnHover
        closeOnClick
        draggable
      />
    </div>
  )
}

export default Layout
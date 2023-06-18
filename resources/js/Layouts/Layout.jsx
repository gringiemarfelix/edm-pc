import TopNav from "@/Components/Nav/Navbar"

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50">
      <TopNav />
      <div className="min-h-screen">
        { children }
      </div>
    </div>
  )
}

export default Layout
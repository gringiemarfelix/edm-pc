import TopNav from "@/Components/Nav/Navbar"

const Layout = ({ children }) => {
  return (
    <div className="bg-neutral-50">
      <TopNav />
      { children }
    </div>
  )
}

export default Layout
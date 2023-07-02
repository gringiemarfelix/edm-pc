import AdminNav from "@/Components/Nav/AdminNav"

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminNav />
      <div className="lg:ml-[20rem] min-h-screen">
        { children }
      </div>
    </div>
  )
}

export default AdminLayout
import { Input } from "@material-tailwind/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { router } from "@inertiajs/react"
import { useState } from "react"

const Search = ({ ...props }) => {
  const [query, setQuery] = useState("")

  const handleChange = (e) => setQuery(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    router.get(route('products.search', {
      search: query
    }))
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Input 
        label="Search" 
        icon={
          <MagnifyingGlassIcon 
            className="cursor-pointer" 
            onClick={handleSubmit} 
          />
        } 
        { ...props } 
        onChange={handleChange}
      />
    </form>
  )
}

export default Search
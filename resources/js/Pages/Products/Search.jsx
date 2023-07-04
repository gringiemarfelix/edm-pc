import Pagination from "@/Components/Pagination"
import Product from "@/Components/Product"
import Layout from "@/Layouts/Layout"
import { Head, router, usePage } from "@inertiajs/react"
import { Card, CardBody, Typography, Slider, Select, Option, Checkbox, CardFooter, Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Search = () => {
  const { categories, brands, products, price_min, price_max, query } = usePage().props
  const navbarHeight = document.getElementById('navbar')?.offsetHeight

  const [init, setInit] = useState(false)
  const [open, setOpen] = useState(true)
  const [filters, setFilters] = useState({
    price: price_max / 2,
    categories: query.categories ?? [],
    brands: query.brands ?? [],
  })
  const [newFilters] = useDebounce(filters, 250, {
    leading: false,
    trailing: true
  })

  useEffect(() => {
    if(init){
      router.visit(route('products.search', {
        search: query.search,
        ...filters
      }), { 
        preserveState: true, 
        preserveScroll: true,
      })
    }else{
      setInit(true)
    }
  }, [newFilters])

  const addSelectedCategory = (e) => {
    const find = filters.categories.find(item => item == e.target.value)

    if(find){
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.filter(item => item != e.target.value),
      }))
    }else{
      setFilters(prev => ({
        ...prev,
        categories: [
          ...prev.categories,
          e.target.value
        ],
      }))
    }
  }

  const addSelectedBrand = (e) => {
    const find = filters.brands.find(item => item == e.target.value)

    if(find){
      setFilters(prev => ({
        ...prev,
        brands: prev.brands.filter(item => item != e.target.value),
      }))
    }else{
      setFilters(prev => ({
        ...prev,
        brands: [
          ...prev.brands,
          e.target.value
        ],
      }))
    }
  }

  const handlePriceFilter = (e) => {
    setFilters(prev => ({
      ...prev,
      price: e.target.value,
    }))
  }

  const handleSortFilter = (e) => {
    setFilters(prev => ({
      ...prev,
      sort: e
    }))
  }

  return (
    <Layout>
      <Head title="Search" />
      <div
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`
        }}
        className="w-full min-h-[inherit] flex justify-center items-center py-6"
      >
        <div className="flex flex-col lg:flex-row justify-center w-full lg:w-3/4 gap-3">
          <Card className="lg:w-64">
            <CardBody className="flex flex-col gap-3">
              <Accordion open={open} icon={<ChevronDownIcon className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : null}`} />}>
                <AccordionHeader className="lg:hidden" onClick={() => setOpen(prev => !prev)}>
                  Filters
                </AccordionHeader>
                <AccordionBody className="p-0">
                  <div>
                    <div className="flex justify-between">
                      <Typography className="font-medium" variant="paragraph" color="blue-gray">
                        Price
                      </Typography>
                      <Typography className="font-medium" variant="paragraph" color="blue">
                        P{parseFloat(filters.price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Typography>
                    </div>
                    <Slider 
                      min={price_min}
                      step={100}
                      max={price_max}
                      className="mb-3"
                      value={filters.price}
                      onChange={handlePriceFilter}
                    />
                    <div className="flex justify-between">
                      <Typography className="font-medium" variant="small" color="blue-gray">
                        P{price_min.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </Typography>
                      <Typography className="font-medium" variant="small" color="blue-gray">
                        P{price_max.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </Typography>
                    </div>
                  </div>
                  <div className={!categories.length > 0 ? 'hidden' : ''}>
                    <Typography className="font-medium" variant="paragraph" color="blue-gray">
                      Category
                    </Typography>
                    <div className="flex flex-col">
                      {
                        categories.map(category =>
                          <Checkbox 
                            key={category.id}
                            label={category.name} 
                            name="categories[]" 
                            value={category.id} 
                            id={`category-${category.id}`}
                            onClick={addSelectedCategory}
                          />
                        )
                      }
                    </div>
                  </div>
                  <div className={!brands.length > 0 ? 'hidden' : ''}>
                    <Typography className="font-medium" variant="paragraph" color="blue-gray">
                      Brand
                    </Typography>
                    <div className="flex flex-col">
                      {
                        brands.map(brand =>
                          <Checkbox 
                            key={brand.id}
                            label={brand.name} 
                            name="brands[]" 
                            value={brand.id} 
                            id={`brand-${brand.id}`}
                            onClick={addSelectedBrand}
                          />
                        )
                      }
                    </div>
                  </div>
                </AccordionBody>
              </Accordion>
            </CardBody>
          </Card>
          <Card className="grow">
            <CardBody className="flex flex-col lg:flex-row justify-between pb-0 gap-3">
              <Typography variant="h6" color="blue-gray">
                Search results for: <span className="font-normal">{ query.search }</span>
              </Typography>
              <div>
                <Select label="Sort by" onChange={handleSortFilter}>
                  <Option value="relevance">
                    Relevance
                  </Option>
                  <Option value="low">
                    Price: Low to High
                  </Option>
                  <Option value="high">
                    Price: High to Low
                  </Option>
                </Select>
              </div>
            </CardBody>
            <CardBody className="p-2 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-3">
              {
                products.data.map(product =>
                  <Product key={product.id} product={product} />
                )
              }
              {
                products.data.length == 0 &&
                <div className="col-span-12 flex items-center justify-center">
                  <Typography variant="paragraph" color="gray">No results found.</Typography>
                </div>
              }
            </CardBody>
            <CardFooter className="flex justify-center">
              <Pagination products={products} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Search
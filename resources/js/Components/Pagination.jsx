import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";

const Pagination = ({ products }) => {
  const { query, page } = usePage().props
  const [active, setActive] = useState(parseInt(page))
  const getItemProps = (index) => ({
    variant: active == index ? "filled" : "text",
    color: active == index ? "blue" : "blue-gray",
    onClick: () => {
      setActive(index)
      goToPage(index)
    },
  });
 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
    goToPage(active + 1)
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
    goToPage(active - 1)
  };

  const goToPage = (page) => {
    router.get(route('products.search', {
      search: query.search,
      page: page,
    }), {}, {
      preserveScroll: true,
      preserveState: true,
      only: ['products']
    })

    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
 
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {
          products.links.map(link =>
            !['&laquo; Previous', 'Next &raquo;'].includes(link.label) &&
            <IconButton key={link.label} {...getItemProps(parseInt(link.label))}>{link.label}</IconButton>
          )
        }
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === products.last_page}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Pagination
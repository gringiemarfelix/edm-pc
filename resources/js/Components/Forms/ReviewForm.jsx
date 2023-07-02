import { useForm } from "@inertiajs/react";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  Rating,
  Button,
  Textarea,
  DialogFooter
} from "@material-tailwind/react";
import { useEffect } from "react";

const ReviewForm = ({ reviewing, closeModal, product }) => {
  const { data, setData, post, put, processing, errors, reset } = useForm({
    rating: 5,
    review: ""
  })

  useEffect(() => {
    if(product){
      if(product?.reviews?.length > 0){
        setData({
          rating: product.reviews[0].rating,
          review: product.reviews[0].review
        })
      }
    }else{
      reset('rating', 'review')
    }
  }, [product])

  const submit = (e) => {
    e.preventDefault()

    if(product?.reviews?.length == 0){
      post(route('products.reviews.store', {
        product: product?.id
      }))
    }else{
      put(route('products.reviews.update', {
        productReview: product.reviews[0].id
      }))
    }
  }

  return (
    <Dialog open={reviewing} handler={closeModal} size="md">
      <form onSubmit={submit}>
        <DialogHeader>
          {product?.reviews?.length == 0 ? 'Reviewing' : 'Updating Review for'} {product?.name}
        </DialogHeader>
        <DialogBody className="flex flex-col gap-3" divider>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">{product?.brand?.name ?? ""}</Typography>
            <img
              src={product?.image?.file}
              alt={product?.name + ' image'}
              className="shadow rounded-lg"
            />
          </div>
          <div>
            <Rating value={data.rating} onChange={(e) => setData('rating', e)} count={5} />
            {
              errors.rating &&
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                {errors.rating}
              </Typography>
            }
          </div>
          <div>
            <Textarea label="Review" value={data.review} onChange={(e) => setData('review', e.target.value)} />
            {
              errors.review &&
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                {errors.review}
              </Typography>
            }
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={closeModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button type="submit" variant="gradient" color="blue">
            {product?.reviews?.length == 0 ? 'Submit' : 'Save'}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default ReviewForm
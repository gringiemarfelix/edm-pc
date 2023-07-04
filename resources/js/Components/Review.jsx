import { Avatar, Card, CardBody, Typography } from "@material-tailwind/react"
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const getStars = (rating) => {
  const stars = []

  for (let index = 1; index <= 5; index++) {
    if(index <= rating){
      stars.push(<StarIcon className="h-4 w-4" />)
    }else{
      stars.push(<StarIconOutline className="h-4 w-4" />)
    }
  }

  return stars
}

const Review = ({ review }) => {
  const stars = getStars(review.rating)

  return (
    <Card>
      <CardBody>
        <div className="flex gap-3">
          <Avatar
            src={review.user.photo ?? `https://ui-avatars.com/api/?size=128&background=e3f2fd&name=${review.user.name}`}
            alt={review.user.name + ' photo'}
            className="shadow"
            size="md"
            withBorder
          />
          <div>
            <Typography variant="h6" color="blue-gray">
              {review.user.name}
            </Typography>
            <Typography variant="small" color="gray">
              {review.created_at}
            </Typography>
            <div className="flex items-center gap text-amber-500 mb-3">
              {stars.map(star => star)}
            </div>
            <Typography variant="paragraph" color="gray">
              {review.review}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Review
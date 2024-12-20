import {Review} from "@/config/models"
import Api from "@/config/api"
import ReviewForm from "@/components/review-form"

type Props = {
  params: { id: number },
  searchParams: { backLink: string }
}

export default async function ReviewDetailsPage({params, searchParams}: Props) {
  const {id} = await params
  const {backLink} = await searchParams
  const review: Review = await Api.getReview(id)

  return <>
    <header>
      <h1>Edit review</h1>
    </header>
    <main>
      <ReviewForm data={review} backLink={backLink}/>
    </main>
  </>
}

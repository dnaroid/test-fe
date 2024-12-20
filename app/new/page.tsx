import ReviewForm from "@/components/review-form"
import {EMPTY_REVIEW} from "@/config/constants"

type Props = {
  searchParams: { backLink: string }
}

export default async function CreateReviewPage({searchParams}: Props) {
  const {backLink} = await searchParams

  return <>
    <header>
      <h1>Create review</h1>
    </header>
    <main>
      <ReviewForm data={EMPTY_REVIEW} backLink={backLink}/>
    </main>
  </>
}

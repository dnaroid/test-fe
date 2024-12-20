import {SearchParams} from "@/config/models"
import Link from "next/link"
import Api from "@/config/api"
import {url} from "@/helpers/utils"
import {PAGINATION} from "@/config/constants"
import ReviewCard from "@/components/review-card"
import SearchForm from "@/components/search-form"

type Props = {
  searchParams: SearchParams
}

export default async function HomePage({searchParams}: Props) {
  const filter = await searchParams
  const authors = await Api.getAuthors()
  const currentSkip = +filter.skip || 0
  const take = +filter.take || PAGINATION
  const reviews = await Api.getReviews({...filter, take: (take + 1).toString()})
  const nextSkip = currentSkip + take
  const prevSkip = Math.max(0, currentSkip - take)
  const backLink = url("/", filter)
  const hasNextPage = reviews.length > take

  return <>
    <header>
      <SearchForm authors={authors} filter={filter}/>
    </header>

    <main>
      {reviews.map((review, i) =>
        (!hasNextPage || i < PAGINATION) &&
        <Link key={review.id} href={url(`/${review.id}`, {backLink})}>
          <ReviewCard review={review}/>
        </Link>)}

      {reviews.length === 0 &&
        <div className="w-full text-center p-5">No reviews found</div>}

      <Link href="/new" className="bg-[var(--bgprimary)] p-3 flex justify-center">+ CREATE REVIEW</Link>
    </main>

    <footer className="grid grid-cols-2 gap-x-20">
      {currentSkip > 0
        ? <Link href={url("/", {...filter, skip: prevSkip})}>← PREV</Link>
        : <span/>}
      {hasNextPage
        ? <Link href={url("/", {...filter, skip: nextSkip})}>NEXT →</Link>
        : <span/>}
    </footer>
  </>
}

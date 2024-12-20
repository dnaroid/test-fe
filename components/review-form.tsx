"use client"

import {Review} from "@/config/models"
import Api from "@/config/api"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {RATINGS_OPTIONS} from "@/config/constants"
import Spinner from "@/components/spinner"
import {useForm} from "react-hook-form"


type Props = {
  data: Review
  backLink: string
}

export default function ReviewForm({data, backLink}: Props) {
  const {register, handleSubmit, formState: {errors}} = useForm<Review>({defaultValues: data})
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSave = async (data: Review) => {
    setIsLoading(true)
    if (!!data.id) {
      await Api.updateReview(data.id, data)
    } else {
      await Api.createReview(data)
    }
    router.replace(backLink ?? "/")
  }

  const onDelete = async () => {
    setIsLoading(true)
    await Api.deleteReview(data.id)
    router.replace(backLink ?? "/")
  }

  return <div className="flex flex-col gap-5">
    {isLoading &&
      <Spinner/>}

    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-5">
      <div className="flex flex-col">
        <label htmlFor="author">Author</label>
        <input id="author"
               autoFocus
               type="text"
               {...register("author", {required: true, minLength: 2, maxLength: 50})}
               aria-invalid={errors.author ? "true" : "false"}/>
        {!!errors.author &&
          <p role="alert">Author name should be 2...50 characters</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="rating">Rating:</label>
        <select id="rating" {...register("rating")}>
          {RATINGS_OPTIONS.map((r) => (
            <option key={r} value={r}>{r}</option>))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input id="title"
               type="text"
               {...register("title", {required: true, minLength: 2, maxLength: 100})}
               aria-invalid={errors.title ? "true" : "false"}/>
        {!!errors.title &&
          <p role="alert">Title should be 2...100 characters</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="content">Content</label>
        <textarea id="content"
                  {...register("content", {required: true, minLength: 10, maxLength: 1000})}
                  aria-invalid={errors.content ? "true" : "false"}/>
        {!!errors.content &&
          <p role="alert">Content should be 10...1000 characters</p>}
      </div>

      <div className="flex justify-between">
        <Link href={backLink ?? "/"}>← CANCEL</Link>
        {!!data.id &&
          <button className="text-[var(--danger)]" type="button"
                  onClick={() => setIsDeleteDialogVisible(true)}>
            DELETE
          </button>}
        <button type="submit">SAVE</button>
      </div>
    </form>

    {isDeleteDialogVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-[var(--bgprimary)] rounded-lg shadow-lg p-6 m-5 max-w-sm w-full text-center">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to delete this review?
          </p>
          <div className="flex justify-center gap-4">
            <button className="text-[var(--danger)]" onClick={onDelete}>
              YES
            </button>
            <button className="text-[var(--primary)]" onClick={() => setIsDeleteDialogVisible(false)}>
              NO
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
}

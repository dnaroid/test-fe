"use client"

import {Review} from "@/config/models"
import Api from "@/config/api"
import Link from "next/link"
import {useRouter} from "next/navigation"

const {useForm} = await import("react-hook-form")

type Props = {
  data: Review
  backLink: string
}

export default function ReviewForm({data, backLink}: Props) {
  const {register, handleSubmit, formState: {errors}} = useForm<Review>({defaultValues: data})
  const router = useRouter()

  const onSave = async (data: Review) => {
    if (!!data.id) {
      await Api.updateReview(data.id, data)
    } else {
      await Api.createReview(data)
    }
    router.replace(backLink ?? "/")
  }

  return <div className="flex flex-col gap-5">
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
        <label htmlFor="rating">Rating</label>
        <input id="rating"
               type="number"
               {...register("rating", {min: 1, max: 5})}
               aria-invalid={errors.rating ? "true" : "false"}/>
        {!!errors.rating &&
          <p role="alert">Rating should be 1...5</p>}
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
        <button type="submit">SAVE</button>
      </div>

    </form>
  </div>
}

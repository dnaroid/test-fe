"use client"

import {useForm} from "react-hook-form"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {INPUT_DEBOUNCE_MS, RATINGS_OPTIONS} from "@/config/constants"
import {SearchParams} from "@/config/models"
import {url} from "@/helpers/utils"

type Props = {
  authors: string[]
  filter: SearchParams
}

export default function SearchForm({authors, filter}: Props) {
  const router = useRouter()
  const {register, watch} = useForm<SearchParams>({defaultValues: filter})
  const [debouncedTitle, setDebouncedTitle] = useState(filter.title || "")

  const watchedFields = watch()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(watchedFields.title || "")
    }, INPUT_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [watchedFields.title])

  useEffect(() => {
    const updatedFilter = {
      ...watchedFields,
      title: debouncedTitle,
      skip: 0,
    }
    router.replace(url("/", updatedFilter))
  }, [debouncedTitle, watchedFields.author, watchedFields.rating])

  return <form className="flex flex-wrap gap-5">
    <div className="flex flex-col flex-1  w-full">
      <label htmlFor="author">Author:</label>
      <select id="author" {...register("author")}>
        <option value="">- Any author -</option>
        {authors.map((author) => (
          <option key={author} value={author}>{author}</option>))}
      </select>
    </div>

    <div className="flex flex-col flex-1  w-full">
      <label htmlFor="rating">Rating:</label>
      <select id="rating" {...register("rating")}>
        <option value="">- Any rating -</option>
        {RATINGS_OPTIONS.map((r) => (
          <option key={r} value={r}>{r}</option>))}
      </select>
    </div>

    <div className="flex flex-col flex-1  w-full">
      <label htmlFor="title">Title:</label>
      <input id="title"
             autoFocus
             {...register("title")}
             type="text"
             placeholder="Search title"/>
    </div>

  </form>
}

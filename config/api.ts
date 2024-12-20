import {notFound} from "next/navigation"
import {Review, SearchParams} from "@/config/models"
import {url} from "@/helpers/utils"
import {API_URL} from "@/config/constants"


const Api = {

  getReviews: async (filter: SearchParams): Promise<Review[]> => {
    const res = await fetch(url(`${API_URL}/reviews`, filter))
    if (!res.ok) notFound()
    return await res.json()
  },

  getReview: async (id: number): Promise<Review> => {
    const res = await fetch(url(`${API_URL}/reviews/${id}`))
    if (!res.ok) notFound()
    return await res.json()
  },

  updateReview: async (id: number, data: Review): Promise<Review> => {
    const res = await fetch(url(`${API_URL}/reviews/${id}`), {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    if (!res.ok) notFound()
    return await res.json()
  },

  createReview: async (data: Review): Promise<Review> => {
    const res = await fetch(url(`${API_URL}/reviews`), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    if (!res.ok) notFound()
    return await res.json()
  },

  getAuthors: async (): Promise<string[]> => {
    const res = await fetch(url(`${API_URL}/reviews/authors`))
    if (!res.ok) notFound()
    return await res.json()
  }
}

export default Api
